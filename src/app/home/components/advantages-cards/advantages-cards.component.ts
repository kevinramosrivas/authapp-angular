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
      color : var(--primary-color-8);
    }
    .title-advantage-card{
      font-size: 1.5rem;
      font-weight: bold;
      color : var(--primary-color-8);
    }
  `,
})
export class AdvantagesCardsComponent { }
