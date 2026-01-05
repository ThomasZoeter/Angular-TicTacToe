import { bootstrapApplication } from '@angular/platform-browser';
import { Component, Directive, Input, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[Highlight]',
  standalone: true
})
export class HighlightDirective {
  @Input('Highlight') highlightColor = 'deepskyblue';
  @HostBinding('style.transition') transition = 'background-color 150ms ease-in-out';
  @HostBinding('style.backgroundColor') bg = 'lightblue';

  @HostListener('mouseenter') onEnter() { this.bg = this.highlightColor; }
  @HostListener('mouseleave') onLeave() { this.bg = 'lightblue'; }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  template: `
      <h3>GAME!</h3>
      <div id="fields" class="playfield">
          <div id="field1" class="field" [Highlight]="'deepskyblue'" [style.background-color]="color" (click)="fieldClicked()">{{ clicked }}</div>
          <div id="field2" class="field" [Highlight]="'deepskyblue'" [style.background-color]="color" (click)="fieldClicked()">{{ clicked }}</div>
          <div id="field3" class="field">{{ clicked }}</div>
          <div id="field4" class="field">{{ clicked }}</div>
          <div id="field5" class="field">{{ clicked }}</div>
          <div id="field6" class="field">{{ clicked }}</div>
          <div id="field7" class="field">{{ clicked }}</div>
          <div id="field8" class="field">{{ clicked }}</div>
          <div id="field9" class="field">{{ clicked }}</div>
      </div>
  `
})
export class App {
  clicked = ''
  color = 'lightblue'
  fieldClicked() {
    this.clicked = 'X'
    this.color == 'lightblue' ? this.color = 'gray' : this.color = 'lightblue'

    }
}

bootstrapApplication(App);
