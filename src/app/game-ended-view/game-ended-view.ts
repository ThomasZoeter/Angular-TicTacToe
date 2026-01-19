import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ResultService} from '../services/result-game.service';

@Component({
  selector: 'game-ended-view',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet
  ],
  template: `
      <h1>Game ended. Result: {{ result }}</h1>
      <button routerLink="/start-game" >Start new game!</button>
  `
})
export class GameEnded implements OnInit {
  public result = ''

  constructor(private resultService: ResultService) {
  }
  ngOnInit(): void {
    this.resultService.currentData.subscribe(result => this.result = result)
  }

}
