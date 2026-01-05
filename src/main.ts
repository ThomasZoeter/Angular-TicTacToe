import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <h3>GAME!</h3>
      <div id="fields" class="playfield">
          <div id="field1" class="field" (click)="fieldClicked()">{{ clicked || '' }}</div>
          <div id="field2" class="field">{{ clicked }}</div>
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
  clicked = '';
  fieldClicked() {
    this.clicked = this.clicked ? 'X' : 'O'
  }
}

bootstrapApplication(App);
