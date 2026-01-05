import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <h3>GAME!</h3>
      <div id="fields" class="playfield">
          <div id="field1" class="field">1</div>
          <div id="field2" class="field">2</div>
          <div id="field3" class="field">3</div>
          <div id="field4" class="field">4</div>
          <div id="field5" class="field">5</div>
          <div id="field6" class="field">6</div>
          <div id="field7" class="field">7</div>
          <div id="field8" class="field">8</div>
          <div id="field9" class="field">9</div>
      </div>
  `
})
export class App {
  name = 'World';
}

bootstrapApplication(App);
