import {Component, OnChanges, signal, SimpleChanges} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  styleUrl: '../styles.css',
  template: `
      <h3>GAME!</h3>
      <h4>Current player: {{ player }}</h4>

      <div class="playfield">
          @for (value of valueFields;let idx = $index;track idx) {
              <button [disabled]="value !== ''"
                      [class.field]="value === ''"
                      [class.selectedField]="value !== ''"
                      (click)="fieldClicked(idx)"> {{ value }}
              </button>
          }
      </div>
      <div> @if (valueFields.lastIndexOf('') < 0) {
          <h1>The game has ended.</h1>
      }
      </div>
  `
})
export class App implements OnChanges {

  public valueFields = ['', '', '', '', '', '', '', '', '']
  public player = 'X'

  fieldClicked(index: number) {
    this.valueFields[index] = this.player
    this.player = this.player === 'X' ? 'O' : 'X'
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
