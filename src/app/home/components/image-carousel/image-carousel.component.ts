import { Component, Input, OnInit, signal, inject } from '@angular/core';
import { ImageSize } from '../../interfaces/image-size.interface';
@Component({
  selector: 'image-carousel-component',
  templateUrl: './image-carousel.component.html',
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
export class ImageCarouselComponent implements OnInit{

  @Input() ImageArray: string[] | string = [];
  @Input() alt: string = '';
  @Input() i_width: ImageSize = {sizeWeb: 'auto', sizeMobile: 'auto'};
  @Input() i_height: ImageSize = {sizeWeb: 'auto', sizeMobile: 'auto'};
  @Input() i_class: string = '';
  public src: string = '';
  public backupImage: string = '';
  public loading = signal(true);
  public defaultImage = 'assets/not-found.svg';
  public hasHttpError = signal(false);

  ngOnInit(): void {
    this.src = this.ImageArray[0];
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
    this.changeImage();
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
  public changeImage(){
    if(this.ImageArray.length > 1){
      let i = 0;
      let intervalo = setInterval(() => {
        this.src = this.ImageArray[i];
        i++;
        if(i >= this.ImageArray.length){
          i = 0;
        }
        console.log(this.src);
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalo);
      }, 1000);
    }
    else{
      this.src = this.ImageArray[0];
    }
  }

  
}
