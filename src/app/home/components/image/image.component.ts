import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ImageComponent implements OnInit{

  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() i_width: string = '';
  @Input() i_height: string = '';
  @Input() i_class: string = '';
  public loading = signal(true);
  public defaultImage = 'assets/not-found.svg';

  ngOnInit(): void {
    //si no se define un ancho o alto, se asigna un valor por defecto
    if(this.i_width == ''){
      this.i_width = 'auto';
    }
    if(this.i_height == ''){
      this.i_height = 'auto';
    }
  } 

  public onLoad(){
    this.loading.set(false);
  }
  public onError(){
    this.src = this.defaultImage;
    this.i_width = '200rem';
    this.i_height = '200rem';
    this.loading.set(false);
  }
}
