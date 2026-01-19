import { Routes } from '@angular/router';
import {StartGame} from './start-game-view/start-game-view';
import {Game} from './game-view/game-view';
import {GameEnded} from './game-ended-view/game-ended-view';

export const routes: Routes = [
  { path: 'start-game', component: StartGame },
  { path: '', redirectTo: '/start-game', pathMatch: 'full'},
  { path: 'game', component: Game },
  { path: 'game-ended', component: GameEnded }
];
