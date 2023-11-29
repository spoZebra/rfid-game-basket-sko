import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";
import {DbService} from "../services/database.service";
import {GameConstants} from "../app-constants";
import {Howl} from "howler";
import {ZebraIoTConnectorService} from '../services/zebra-iot-connector-service';
import {ReadTagEventModel} from '../models/reat-tag-event-model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  position!: number
  points: number = 0;
  intervalId: any;

  pointsTextColor: string = '#59f70a'
  positionTextColor: string = '#4C4E52'

  players: any[] = []
  playersToBeat: any[] = []

  gameOverSound = new Howl({
    src: ['../../assets/game_over_sound.mp3'],
    loop: false
  });

  constructor(private router: Router, private playerService: PlayerService, private dbService: DbService, private zIoTConnectorService: ZebraIoTConnectorService) {
  }

  ngOnInit() {
    this.dbService.getPlayers().then((players) => {
      this.players = players;
      this.playersToBeat = players

      this.configureIot()
      this.startGameTime()
      this.position = players.length
      this.getApproximatePosition()
    });
  }

  calculateFontSize(): string {
    const baseFontSize = 5;
    const scaleFactor = 0.8;

    return `max(${baseFontSize * scaleFactor}vmin, min(${baseFontSize}vmin, 5vmin))`;
  }

  calculateSubTextFontSize(): string {
    // Adjust the font size for the new line of text
    const baseSubTextFontSize = 3;
    const scaleFactorSubText = 0.8;

    return `max(${baseSubTextFontSize * scaleFactorSubText}vmin, min(${baseSubTextFontSize}vmin, 3vmin))`;
  }

  configureIot() {
    this.zIoTConnectorService.newTagAccessOpEvent.subscribe((tagData: ReadTagEventModel) => {
      // Check if we've received an array of tag or just one tag
      if (Array.isArray(tagData.data)) {
        tagData.data.forEach(singleData => {
          this.points++
          this.getClosestPosition()
        })
      } else {
        this.points++
        this.getClosestPosition()
      }
    })
  }

  startGameTime() {
    this.zIoTConnectorService.startOperation()
    this.intervalId = setTimeout(() => {
      // Stop reading
      this.zIoTConnectorService.stopOperation()

      console.log("Time is UP!")
      this.gameOverSound.play()

      if (this.playerService.getPlayerName() != "TEST" || this.playerService.getPlayerName() != "") {
        this.dbService.insertPlayer(this.playerService.getPlayerName(), this.points)
      } else {
        console.log("Test player detected, skipping insertion...")
      }
      this.moveToLeaderboard()
    }, GameConstants.GAME_SESSION_TIME * 1000);
  }

  getClosestPosition() {
    let closestIndex: number = this.players.length
    let closestDifference: number;

    this.players.forEach((player, index) => {
      const difference = Math.abs(this.points - player.points);

      if (closestDifference === undefined || difference < closestDifference) {
        closestIndex = index;
        closestDifference = difference;
      }
    });

    this.position = closestIndex + 1
    console.log("Closest position: " + this.position);
  }

  getApproximatePosition() {
    this.players.forEach((player, index) => {
      if (this.points > player.points) {
        this.position = index++
        console.log("Currently position.." + this.position)
      } else {
        return;
      }
    })
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // Stop reading
    this.zIoTConnectorService.stopOperation()
    this.playerService.setPlayerName("")

    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }

    this.router.navigate(['player-input']);
  }

  moveToLeaderboard() {
    setTimeout(() => {
      this.router.navigate(['/leaderboard']);
    }, GameConstants.GAME_END_TIMEOUT * 1000);
  }
}
