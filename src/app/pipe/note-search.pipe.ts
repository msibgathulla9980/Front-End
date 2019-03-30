import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../../core/model/note/note';

@Pipe({
  name: 'noteSearch'
})
export class NoteSearchPipe implements PipeTransform {

  transform(notes: Note[], searchValue: any): any {
    console.log(notes, searchValue);
    if (!searchValue) {
      return null;
    } else {
      return notes.filter(({ title }) => {
        return title.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
  }

}
