import {bootstrapApplication, DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {
  Component,
  Directive,
  Input,
  HostBinding,
  HostListener,
  ViewChildren,
  QueryList,
  ElementRef, numberAttribute
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'game-ends',
  standalone: true,
  template: `
      <p>The winner is {{ winner }}</p>
  `
})
export class GameEndComponent {
  @Input() winner = '';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
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
  `
})
export class App {

  public valueFields = ['', '', '', '', '', '', '', '', '']
  public player = 'X'

  fieldClicked(index: number) {
    this.valueFields[index] = this.player
    this.player = this.player === 'X' ? 'O' : 'X'
  }
}

bootstrapApplication(App);
