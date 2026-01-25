import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private gameResult = new BehaviorSubject<boolean | null>(null);
  private winningRow = new BehaviorSubject<number[] | null>([]);
  currentResultData = this.gameResult.asObservable();
  currentWinningRowData = this.winningRow.asObservable();

  gameStateAfterEnd(resultState: boolean | null) {
    this.gameResult.next(resultState);
  }

  getWinningRow(resultRow: number[] | null) {
    this.winningRow.next(resultRow);
  }


}
