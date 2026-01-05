import {bootstrapApplication, DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { Component, Directive, Input, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  standalone: true,
  selector: '[clickColor]'
})
export class ClickColorDirective {

  private toggle: boolean = false;
  @Input() color: string = 'gray';

  constructor(private doms: DomSanitizer) { }

  @HostBinding('style') get myStyle(): SafeStyle {
    let style : string = this.toggle ? `background-color: ${this.color}` : '';
    return this.doms.bypassSecurityTrustStyle(style);
  }

  @HostListener('click') onClick() {
    this.toggle = !this.toggle;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickColorDirective],
  template: `
      <h3>GAME!</h3>
      <div id="fields" class="playfield">
          <div id="field1" class="field" clickColor [style.background-color]="'lightblue'">{{ clicked }}</div>
          <div id="field2" class="field" clickColor [style.background-color]="'lightblue'">{{ clicked }}</div>
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
  clicked = 'X'
  color = 'lightblue'
  // fieldClicked() {
  //   this.clicked = 'X'
  //   this.style.backgroundColor == 'lightblue' ? this.color = 'gray' : this.color = 'lightblue'
  //
  //   }
}

bootstrapApplication(App);
