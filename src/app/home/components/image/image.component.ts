import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, inject } from '@angular/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'image-component',
  templateUrl: './image.component.html',
  styles: `
    :host {
      display: block;
    }
    img {
      animation: fadeIn 1s; 
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
  `,
})
export class ImageComponent implements OnInit{

  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() i_width: string = '';
  @Input() i_height: string = '';
  @Input() i_class: string = '';
  @Input() i_width_mobile: string = '';
  @Input() i_height_mobile: string = '';
  public width = '';
  public height = '';
  public loading = signal(true);
  public defaultImage = 'assets/not-found.svg';
  private responsive = inject(BreakpointObserver);

  ngOnInit(): void {
    //si no se define un ancho o alto, se asigna un valor por defecto
    if(this.i_width == ''){
      this.i_width = 'auto';
    }
    if(this.i_height == ''){
      this.i_height = 'auto';
    }
    if(this.i_width_mobile == ''){
      this.i_width_mobile = this.i_width;
    }
    if(this.i_height_mobile == ''){
      this.i_height_mobile = this.i_height;
    }
    if(this.src == ''){
      this.onError();
    }
    //se observa el ancho de la pantalla para asignar un ancho y alto a la imagen
    this.responsive.observe([
      Breakpoints.Web,
      Breakpoints.Tablet,
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.TabletPortrait,
    ])
    .subscribe(result => {
      if(result.matches){
        this.width = this.i_width;
        this.height = this.i_height;
      }
    });
    this.responsive.observe([
      Breakpoints.Handset
    ])
    .subscribe(result => {
      if(result.matches){
        this.width = this.i_width_mobile;
        this.height = this.i_height_mobile
      }
    });
  } 

  public onLoad(){
    this.loading.set(false);
  }
  public onError(){
    this.src = this.defaultImage;
    this.loading.set(false);
  }
}
