import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';

import { Datasens } from "../../models/datasens.model";
import { DatasensService } from "../../services/datasens.service";

@Component({
  selector: 'app-datasens-details',
  templateUrl: './datasens-details.component.html',
  styleUrls: ['./datasens-details.component.css']
})

export class DatasensDetailsComponent implements OnInit{

  @Input() dataSens?: Datasens;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  currentDataSens: Datasens = {
    title: '',
    description: '',
    published: false,
    value: 0
  };
  message = '';

  constructor(private dataSensService: DatasensService) {
    this.currentDataSens = { ...this.dataSens};
    console.log('info para detalle',this.currentDataSens);
  }

  ngOnInit(): void {
    this.message= '';
  }

  ngOnChanges(): void{
    this.message = '';
    this.currentDataSens = { ...this.dataSens};
  }

  updatePublished(status: boolean): void {
    if (this.currentDataSens.key) {
      this.dataSensService.update(this.currentDataSens.key, {published: status})
        .then(() => {
          this.currentDataSens.published = status;
          this.message = "Estado actualizado!!"
        })
        .catch(err => console.log(err));
    }
  }

  updateDataSens():void{
    const data = {
      title: this.currentDataSens.title,
      description: this.currentDataSens.description
    };

    if (this.currentDataSens.key){
      this.dataSensService.update(this.currentDataSens.key, data)
        .then(() => this.message = 'DataSens actualizado!!')
        .catch(err => console.log(err));
    }
  }

  deleteDataSens(): void {
    if (this.currentDataSens.key){
      this.dataSensService.delete(this.currentDataSens.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'DatasensActualizado!!'
        })
        .catch(err => console.log(err));
    }
  }

}
