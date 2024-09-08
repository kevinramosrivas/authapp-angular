
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'button-card',
  templateUrl: './button.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ButtonComponent { 
  @Input() 
  text: string = 'Button';
  @Input()
  b_class: string  = '';
  @Input()
  isDisabled: boolean = false;
  @Input()
  iconRight: string = '';
  @Input()
  iconLeft: string = '';

  buttonClass = 'btn btn-primary rounded-4';

  constructor(){
    this.buttonClass = this.buttonClass.concat(this.b_class);
  }
}
