import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { ImageSize } from '../../interfaces/image-size.interface';
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
  @Input() i_width: ImageSize = {sizeWeb: 'auto', sizeMobile: 'auto'};
  @Input() i_height: ImageSize = {sizeWeb: 'auto', sizeMobile: 'auto'};
  @Input() i_class: string = '';
  public loading = signal(true);
  public needDnone = signal(false);
  public needDnoneMobile = signal(true);
  public defaultImage = 'assets/not-found.svg';

  ngOnInit(): void {
    if(this.src == ''){
      this.onError();
    }
    if(this.i_width.sizeMobile == undefined){
      this.i_width.sizeMobile = this.i_width.sizeWeb;
    }
    if(this.i_height.sizeMobile == undefined){
      this.i_height.sizeMobile = this.i_height.sizeWeb;
    }
  } 

  public onLoad(){
    this.loading.set(false);
    this.needDnone.set(true);
    this.needDnoneMobile.set(false);
  }
  public onError(){
    this.src = this.defaultImage;
    this.loading.set(false);
    //añadir d-none a la imagen
    this.needDnone.set(false);
    this.needDnoneMobile.set(false);
  }
}
