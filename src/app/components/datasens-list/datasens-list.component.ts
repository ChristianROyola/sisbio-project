import {Component, OnInit} from '@angular/core';

import {DatasensService} from "../../services/datasens.service";
import {Datasens} from "../../models/datasens.model";
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-datasens-list',
  templateUrl: './datasens-list.component.html',
  styleUrls: ['./datasens-list.component.css']
})
export class DatasensListComponent implements OnInit{

  dataSens?: Datasens[];
  currentDataSens?: Datasens;
  currentIndex = -1;
  title= '';

  constructor(private dataSensService: DatasensService ) {
  }

  ngOnInit(): void{
  this.retrieveDataSens();
  }

  refreshList(): void {
    this.currentDataSens = undefined;
    this.currentIndex = -1;
    this.retrieveDataSens();
  }

  retrieveDataSens(): void{
    this.dataSensService.getAll().snapshotChanges().pipe(
      map(changes =>
          changes.map(c =>
            ({key: c.payload.key,
              ...c.payload.val()})
          )
      )
    ).subscribe(data => {
      this.dataSens = data;
      console.log("retrieveDataSens",this.dataSens);
    })
  }

  setActiveDataSens(dataSens: Datasens, index: number): void{

    this.currentDataSens = dataSens;
    if (this.currentDataSens.key != null) {
      this.dataSensService.getOne(this.currentDataSens.key).snapshotChanges().subscribe(news => {
        console.log("get", news);
      })
    }
    this.currentIndex = index;
  }

  removeAllDataSens():void {
    this.dataSensService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
