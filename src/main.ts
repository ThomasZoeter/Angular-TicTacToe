import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
      <h3>Hello {{ name }}</h3>
      <button (click)="name = 'Angular'">Reset</button>
  `
})
export class App {
  name = 'World';
}

bootstrapApplication(App);
