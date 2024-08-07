import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'skeleton-product-card',
  templateUrl: './skeleton-product-card.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SkeletonProductCardComponent { }
