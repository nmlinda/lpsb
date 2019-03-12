import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CariPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'cari',
})
export class CariPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[],cariAnalisis: string): any[] {
    if(!items) return [];
    if(!cariAnalisis) return items;
    cariAnalisis = cariAnalisis.toLowerCase();
    return items.filter( item=> {
      return item.JenisAnalisis.toString().toLowerCase().includes(cariAnalisis); 
    });
  }
}
