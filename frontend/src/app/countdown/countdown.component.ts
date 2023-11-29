import {Component, HostListener, OnInit, OnDestroy} from '@angular/core';
import {GameConstants} from '../app-constants'
import {Router} from '@angular/router';
import { ZebraIoTConnectorService } from '../services/zebra-iot-connector-service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  countdown: number = GameConstants.GAME_READY_COUNTDOWN
  intervalId: any;

  constructor(private router: Router, private zIoTConnectorService : ZebraIoTConnectorService) {
  }

  ngOnInit(): void {
    this.startCountdown();
    this.zIoTConnectorService.setReadMode()
    this.zIoTConnectorService.setReaderConfig()
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
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
