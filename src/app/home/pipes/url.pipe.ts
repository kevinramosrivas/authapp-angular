import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'url',
  standalone: true,
})
export class UrlPipe implements PipeTransform {
  private urlRegex = /https?:\/\/[^"]+/;

  transform(value: string): string {
    //extraer la url del patron
    const url = value.match(this.urlRegex);

    if (url) {
      return url[0];
    }

    return '';
  }

}
