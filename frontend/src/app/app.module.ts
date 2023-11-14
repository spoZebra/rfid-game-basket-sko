import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerInputComponent } from './player-input/player-input.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { CuntdownComponent } from './cuntdown/cuntdown.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    PlayerInputComponent,
    LeaderboardComponent,
    CuntdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
