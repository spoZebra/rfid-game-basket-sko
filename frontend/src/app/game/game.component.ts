import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";
import {DbService} from "../services/database.service";
import {GameConstants} from "../app-constants";
import {Howl} from "howler";

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

  constructor(private router: Router, private playerService: PlayerService, private dbService: DbService) {
  }

  ngOnInit() {
    this.startGameTime()
  }

  startGameTime() {
    setTimeout(() => {
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
