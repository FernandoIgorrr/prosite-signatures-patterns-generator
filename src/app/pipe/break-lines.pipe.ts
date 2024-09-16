import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakLines',
  standalone: true
})
export class BreakLinesPipe implements PipeTransform {


  transform(value: string): string {
    const chunkLength = 60;
    let result = '';
    for (let i = 0; i < value.length; i += chunkLength) {
      result += value.slice(i, i + chunkLength) + '\n';
    }
    return result.trim();
  }

}
