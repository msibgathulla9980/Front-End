
import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../../core/model/note/note';
@Pipe({
  name: 'filterNote'
})
export class FilterNotePipe implements PipeTransform {
  transform(notes: Note[], valid = ''): Note[] {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    } else if (valid === 'archive') {
      return notes.filter((item) => {
        if (item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    } else if (valid === 'pinned') {
      return notes.filter((item) => {
        if (!item.inTrash && item.pinned) {
          return item;
        }
      });
    } else if (valid === 'inTrash') {
      return notes.filter((item) => {
        if (item.inTrash) {
          return item;
        }
      });
    } else if (valid === 'reminder') {
      return notes.filter((item) => {
        if (!item.inTrash && item.reminder) {
          return item;
        }
      });
    }
    return null;
  }

}
