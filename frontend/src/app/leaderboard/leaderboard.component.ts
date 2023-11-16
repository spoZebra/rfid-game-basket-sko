import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DbService} from "../services/database.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('start', style({ transform: 'translateY(0)' })),
      state('end', style({ transform: 'translateY(-100%)' })),
      transition('start <=> end', animate('7000ms ease-in-out')),
    ]),
  ],
})

export class LeaderboardComponent implements OnInit {
  players: any[] = [];

  animationState = 'start';
  @ViewChild('tableContainer') tableContainer: ElementRef | undefined;

  constructor(private router: Router, private dbService: DbService) {
  }

  ngOnInit() {
    this.dbService.getPlayers().then((players) => {
      this.players = players;
      //this.startScrolling();
    });
  }

  startScrolling() {
    setInterval(() => {
      if (this.tableContainer) {
        const tableElement = this.tableContainer.nativeElement;
        const isAtBottom = tableElement.scrollHeight - tableElement.scrollTop === tableElement.clientHeight;

        if (isAtBottom && this.animationState === 'start') {
          this.scrollTable()
        }
      }
    }, 100);
  }

  scrollTable() {
    this.animationState = this.animationState === 'start' ? 'end' : 'start';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.router.navigate(['player-input']);
  }
}
