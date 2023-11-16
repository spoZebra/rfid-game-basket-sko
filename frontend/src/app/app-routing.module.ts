import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayerInputComponent} from './player-input/player-input.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {CuntdownComponent} from './cuntdown/cuntdown.component';
import {GameComponent} from "./game/game.component";

const routes: Routes = [
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'player-input', component: PlayerInputComponent},
  {path: 'cuntdown', component: CuntdownComponent},
  {path: 'game', component: GameComponent},
  {path: '', redirectTo: '/leaderboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
