import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advantages-cards',
  templateUrl: './advantages-cards.component.html',
  styles: `
    :host {
      display: block;
    }
    .card{
      border: none;
      color : var(--primary-color-9);
    }
  `,
})
export class AdvantagesCardsComponent { }
