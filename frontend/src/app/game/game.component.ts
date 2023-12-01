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
      this.position = players.length + 1
    });
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

      if (this.playerService.getPlayerName() === "TEST" ||
        this.playerService.getPlayerName() === "TEST TEST" ||
        this.playerService.getPlayerName() === ""
      ) {
        console.log("Test player detected, skipping insertion...")
        this.moveToLeaderboard()
        return
      }

      this.dbService.insertPlayer(this.playerService.getPlayerName(), this.points)
      this.moveToLeaderboard()
    }, GameConstants.GAME_SESSION_TIME * 1000);
  }

  getClosestPosition() {
    let closestIndex: number = 1
    let closestDifference: number;

    if (this.players.length == 0 || this.position == 1) {
      console.log("No need to go for the loop, directly applying position 1");
      this.position = 1
      return
    }

    let nextPosition: number = this.players.length + 1

    this.players.forEach((player, index) => {
      if ((this.points >= player.points)) {
        nextPosition--
        console.log("Closest index: " + nextPosition);
      }


      //const difference = Math.abs(this.points - player.points);

      /*if (closestDifference === undefined || difference < closestDifference) {
        closestIndex = index;
        closestDifference = difference;
        console.log("Closest index: " + closestIndex);
      }*/
    });

    this.position = nextPosition

    // If the array is not empty and the new player has a score greater than the closest player,
    // update the position to be after the closest player
    /*if (this.players.length == 0) {
      this.position = closestIndex
    } else {
      this.position = closestIndex + 2
    }*/

    /*} else if (this.players.length > 0 && this.points > this.players[closestIndex].points) {
      this.position = closestIndex + 1; // Place after the closest player
    } else if (this.players.length > 0 && this.points == this.players[closestIndex].points) {
      this.position = closestIndex + 2
    } else if (this.players.length > 0 && this.points < this.players[closestIndex].points) {
      this.position = closestIndex + 3*/
    //}else {
    //console.error("Case not being handled!")
    //}

    console.log("Closest position: " + this.position);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'x' || event.key === 'X') {
      event.preventDefault();

      // Stop reading
      this.zIoTConnectorService.stopOperation()
      this.playerService.setPlayerName("")

      if (this.intervalId) {
        clearTimeout(this.intervalId);
      }

      this.router.navigate(['player-input']);
    } else if (event.key === '+') {
      this.points++
      this.getClosestPosition()
    }
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
