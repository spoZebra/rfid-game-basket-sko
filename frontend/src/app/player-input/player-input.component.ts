import {Component, HostListener, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {GameConstants} from '../app-constants'
import {PlayerService} from '../services/player.service'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {DbService} from "../services/database.service";

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})
export class PlayerInputComponent implements OnInit, AfterViewInit {
  private inactivityTimer: any;
  private inactivityDuration = GameConstants.PLAYER_INPUT_TIMEOUT;

  @ViewChild('playerName') playerName!: ElementRef;

  constructor(private router: Router, private playerService: PlayerService, private dbService: DbService) {
    this.resetInactivityTimer();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.playerName.nativeElement.focus();
    this.playerName.nativeElement.value = ""
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keypress', ['$event'])
  onUserActivity() {
    this.resetInactivityTimer();
  }

  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      // Redirect to another component or perform your timeout action here
      this.router.navigate(['/leaderboard']);
    }, this.inactivityDuration);
  }

  navigateToGame() {
    if (this.playerName.nativeElement.value == "") {
      return
    }

    console.log(this.playerName.nativeElement.value);
    this.playerService.setPlayerName(this.playerName.nativeElement.value.toUpperCase());
    this.router.navigate(['/countdown'])

    clearTimeout(this.inactivityTimer);
  }
}
