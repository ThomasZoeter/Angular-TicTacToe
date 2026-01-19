import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playerChosen = new BehaviorSubject<string>('X');
  currentData = this.playerChosen.asObservable();

  choosePlayer(player: string) {
    this.playerChosen.next(player);
  }
}
