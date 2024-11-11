import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'paginator-products',
  templateUrl: './paginator.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PaginatorComponent implements OnChanges {
  @Input() public totalProducts: number = 0;
  @Input() public limit: number = 10;
  @Input() publicloading: boolean = false;
  @Input() public hasHttpError: boolean = false;
  @Input() public offset: number = 0;
  public pages: number[] = [];
  
  ngOnChanges (changes : SimpleChanges): void {
    if (changes['totalProducts'] && changes['totalProducts'].currentValue !== 0) {
      this.calculateArrayOfPages();
    }
  }

  public calculateArrayOfPages(){
    this.pages = Array.from(
      {length: Math.ceil(this.totalProducts / this.limit)}, 
      (v, i) => {
        return i * this.limit;
      }
    );

  }
  public get totalPages(): number {
    return Math.ceil(this.totalProducts / this.limit);
  }

  public get currentPage(): number {
    return Math.ceil(this.offset / this.limit) + 1;
  }

  public get isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  public get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  public get hasProducts(): boolean {
    return this.totalProducts > 0;
  }

  public get hasPages(): boolean {
    return this.totalPages > 1;
  }

  public nextPage(): void {
    this.offset += this.limit;
  }

  public previousPage(): void {
    this.offset -= this.limit;
  }

  public firstPage(): void {
    this.offset = 0;
  }

  public lastPage(): void {
    this.offset = (this.totalPages - 1) * this.limit;
  }

  public goToPage(page: number): void {
    this.offset = (page - 1) * this.limit;
  }
}
