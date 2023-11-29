import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";
import {DbService} from "../services/database.service";
import {GameConstants} from "../app-constants";
import {Howl} from "howler";
import { ZebraIoTConnectorService } from '../services/zebra-iot-connector-service';
import { ReadTagEventModel } from '../models/reat-tag-event-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  points: number = 0;
  countdownTextColor: string = '#59f70a';

  gameOverSound = new Howl({
    src: ['../../assets/game_over_sound.mp3'],
    loop: false
  });

  constructor(private router: Router, private playerService: PlayerService, private dbService: DbService, private zIoTConnectorService : ZebraIoTConnectorService) {
  }

  ngOnInit() {
    this.configureIot()
    this.startGameTime()
  }

    configureIot(){
      
      this.zIoTConnectorService.newTagAccessOpEvent.subscribe((tagData: ReadTagEventModel) => {
        // Check if we've received an array of tag or just one tag
        if (Array.isArray(tagData.data)) {
          tagData.data.forEach(singleData => {
            this.points++
          })
        }
        else{
          this.points++
        } 
      })
      this.zIoTConnectorService.setReadMode()
      this.zIoTConnectorService.setReaderConfig()
  }

  startGameTime() {

    this.zIoTConnectorService.startOperation()

    setTimeout(() => {
      // Stop reading
      this.zIoTConnectorService.stopOperation()
      
      console.log("Time is UP!")
      this.gameOverSound.play()

      if (this.playerService.getPlayerName() != "TEST") {
        this.dbService.insertPlayer(this.playerService.getPlayerName(), this.points)
      } else {
        console.log("Test player detected, skipping insertion...")
      }
      this.moveToLeaderboard()
    }, GameConstants.GAME_SESSION_TIME * 1000);
  }

  moveToLeaderboard() {
    setTimeout(() => {


      this.router.navigate(['/leaderboard']);
    }, GameConstants.GAME_END_TIMEOUT * 1000);
  }
}
