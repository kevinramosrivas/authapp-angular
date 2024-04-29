import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-auth',
  templateUrl: './message-auth.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class MessageAuthComponent { 
  @Input() message: string = '';
  
}
