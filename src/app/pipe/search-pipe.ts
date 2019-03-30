import { Pipe, PipeTransform } from '@angular/core';
import { Label } from '../../core/model/label/label';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(labels: Label[] , searchValue: any): any {
    if (!searchValue) {
      return labels;
    } else {
      return labels.filter(({labelName}) => {
        return labelName.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
  }
}
