import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private gameResult = new BehaviorSubject<string>('Draw');
  currentData = this.gameResult.asObservable();

  gameStateAfterEnd(result: string) {
    this.gameResult.next(result);
  }
}
