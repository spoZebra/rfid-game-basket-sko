import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GameConstants } from '../app-constants'
import { PlayerService } from '../services/player.service'

@Component({
  selector: 'app-player-input',
  templateUrl: './player-input.component.html',
  styleUrls: ['./player-input.component.css']
})
export class PlayerInputComponent implements OnInit {
  private inactivityTimer: any;
  private inactivityDuration = GameConstants.PLAYER_INPUT_TIMEOUT;

  @ViewChild('playerName') playerName!: ElementRef;

  constructor(private router: Router, private playerService: PlayerService) {
    //this.resetInactivityTimer();
  }

  ngOnInit() {}

  /*@HostListener('window:mousemove', ['$event'])
  @HostListener('window:keypress', ['$event'])
  onUserActivity() {
    this.resetInactivityTimer();
  }*/

/*  resetInactivityTimer() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      // Redirect to another component or perform your timeout action here
      this.router.navigate(['/leaderboard']);
    }, this.inactivityDuration);
  }*/
  
  navigateToGame(){
    console.log(this.playerName.nativeElement.value);
    this.playerService.setPlayerName(this.playerName.nativeElement.value);

    this.router.navigate(['/cuntdown'])
  }
}
