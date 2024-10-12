import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { ImageSize } from '../../interfaces/image-size.interface';
@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styles: `
    :host {
      display: block;
    }
    .img-web{
      @media (min-width: 769px){
        display: block;
      }
      @media (max-width: 768px){
        display: none;
      }
    }
    .img-mobile{
      @media (max-width: 768px){
        display: block;
      }
      @media (min-width: 769px){
        display: none;
      }

    }
  `,
})
export class ImageComponent implements OnInit{

  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() i_width: ImageSize = {sizeWeb: 'auto', sizeMobile: 'auto'};
  @Input() i_height: ImageSize = {sizeWeb: 'auto', sizeMobile: 'auto'};
  @Input() i_class: string = '';
  public backupImage: string = '';
  public loading = signal(true);
  public defaultImage = 'assets/not-found.svg';
  public hasHttpError = signal(false);

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
    this.backupImage = this.src;
  } 

  public onLoad(){
    this.loading.set(false);
  }
  public onError(){
    if(this.src == this.defaultImage){
      this.hasHttpError.set(true);
      this.loading.set(false);
    }
    else{
      this.src = this.defaultImage;
      this.loading.set(false);
    }
  }

  public retryLoadImage(){
    this.src = this.backupImage;
    this.hasHttpError.set(false);
    this.loading.set(true);
  }

  
}
