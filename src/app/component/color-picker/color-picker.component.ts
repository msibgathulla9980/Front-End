import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../core/service/search.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit {

  @Input() newNote;
  @Output() colorChange = new EventEmitter();

  public colors = ['#FFE4C4', '#5F9EA0', '#00FFFF',
    '#ADFF2F', '#FF69B4', '#F08080', '#778899', '#4682B4', '#F8F8FF'];
  constructor(public data: DataService) { }

  ngOnInit() {
    // this.changeColor(this.data);
  }

  changeColor(color) {
    this.newNote.color = color;
    const note = this.newNote;
    const data = { note };
    this.colorChange.emit(data);
  }

}
