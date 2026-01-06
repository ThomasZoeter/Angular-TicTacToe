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
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
      <h3>GAME!</h3>

      <div class="playfield">
          @for (value of valueFields;let idx = $index;track idx) {
              <button class="field"
                      [style.background-color] = "value !== '' ? 'gray':'lightblue'"
                      (click)="fieldClicked(idx)"> {{ value }}
              </button>
          }
      </div>
      <div>
          {{ player }}
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
