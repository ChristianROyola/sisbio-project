import {Component, OnInit} from '@angular/core';
import { Datasens } from "../../models/datasens.model";
import { DatasensService } from "../../services/datasens.service";

@Component({
  selector: 'app-add-datasens',
  templateUrl: './add-datasens.component.html',
  styleUrls: ['./add-datasens.component.css']
})
export class AddDatasensComponent implements OnInit{

  dataSens: Datasens = new Datasens();
  submitted = false;

  constructor(private dataSensService : DatasensService) {}

  ngOnInit() {
  }

  saveDataSens(): void{
    this.dataSensService.create(this.dataSens).then(() => {
      console.log('Registro Creado con Éxito');
      this.submitted = true;
    })
  }

  newDataSenses(): void{
    this.submitted = false;
    this.dataSens = new Datasens();
  }

}
