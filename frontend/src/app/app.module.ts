import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PlayerInputComponent} from './player-input/player-input.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {CountdownComponent} from './countdown/countdown.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameComponent} from './game/game.component';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';
import {ZebraIoTConnectorService} from './services/zebra-iot-connector-service';
import {HttpClientModule} from '@angular/common/http';
import {AutoFocus} from "./directives/AutoFocus";

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "127.0.0.1",
  port: 1997,
  path: '/mqtt',
};

@NgModule({
  declarations: [
    AppComponent,
    PlayerInputComponent,
    LeaderboardComponent,
    CountdownComponent,
    GameComponent,
    AutoFocus
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [ZebraIoTConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
