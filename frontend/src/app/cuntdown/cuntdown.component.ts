import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { GameConstants } from '../app-constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuntdown',
  templateUrl: './cuntdown.component.html',
  styleUrls: ['./cuntdown.component.css']
})
export class CuntdownComponent implements OnInit, OnDestroy {
  countdown: number = GameConstants.GAME_READY_COUNTDOWN
  intervalId: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    // Navigate to the previous component when the Escape key is pressed
    this.router.navigate(['/']);
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.intervalId);

        this.router.navigate(['/game']);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
