import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeData } from '@core/models/Employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
    // changeDetection:ChangeDetectionStrategy.Default
})
export class ListComponent implements OnInit {

  @Input() title: string;
  @Input() data: EmployeeData[] = [];
  @Output() add = new EventEmitter<string>();
  label: string;

  constructor() { }

  ngOnInit() {
  }

  public addItem(): void{
    this.add.emit(this.label);
  }

}
