import {Component, OnInit} from '@angular/core';

import {DatasensService} from "../../services/datasens.service";
import {Datasens} from "../../models/datasens.model";
import {map} from 'rxjs/operators'

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-datasens-list',
  templateUrl: './datasens-list.component.html',
  styleUrls: ['./datasens-list.component.css']
})
export class DatasensListComponent implements OnInit{

  dataSens?: Datasens[];
  dataSens2?: Datasens[];

  dataSensDet?: Datasens[];
  currentDataSens?: Datasens;
  currentDataSens2?: Datasens;
  currentIndex = -1;
  currentIndex2 = -1;
  dataSensDetail: any[] | undefined

  dataPoints:any[] = [];
  timeout:any = null;
  xValue:number = 1;
  yValue:number = 10;
  newDataCount:number = 10;
  chart: any;

  constructor(private dataSensService: DatasensService,
              private http : HttpClient) {
  }

  ngOnInit(): void{
  this.retrieveDataSens2();
  }

  refreshList(): void {
    this.currentDataSens = undefined;
    this.currentIndex = -1;
    this.retrieveDataSens2();
  }

  /*
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
  }*/

  retrieveDataSens2(): void
  {
      this.dataSensService.getAll().subscribe(items => {
      this.dataSens = items;
    });
  }

  /*
  setActiveDataSens(dataSens: Datasens, index: number): void{
    this.currentDataSens = dataSens;
    if (this.currentDataSens.key != null) {
      this.dataSensService.getOne(this.currentDataSens.key).subscribe(subItems => {
        this.dataSens2 = subItems;
          console.log("------->>>>"+this.dataSens2);
        });
    }
  }
*/
  //Respaldo setActiveDatasens
  setActiveDataSens(dataSens: Datasens, index: number): void{
    this.currentDataSens = dataSens;
    if (this.currentDataSens.key != null) {
      this.dataSensService.getOne2(this.currentDataSens.key).snapshotChanges().pipe(
        map(changes =>
            changes.map(x =>
              ({
                key: x.payload.key,
                ...x.payload.val()})
              )
            )
      ).subscribe(subItems => {
        this.dataSens2 = subItems;
        console.log("------->>>>"+this.dataSens2);
      });
    }
  }


  setActiveDataSensDetail(dataSens: Datasens, index: number): void{
    console.log("Recibe data", dataSens)

    this.currentDataSens2 = dataSens;
    this.currentIndex = index;
  }


  removeAllDataSens():void {
    this.dataSensService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  chartOptions = {
    theme: "light2",
    title: {
      text: "Representación"
    },
    data: [{
      type: "line",
      dataPoints: this.dataPoints
    }]
  }

  getChartInstance(chart: object) {
    this.chart = chart;
    this.updateData();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  updateData = () => {
    this.http.get("https://canvasjs.com/services/data/datapoints.php?xstart="+this.xValue+"&ystart="+this.yValue+"&length="+this.newDataCount+"type=json", { responseType: 'json' }).subscribe(this.addData);
  }

  addData = (data:any) => {
    if(this.newDataCount != 1) {
      data.forEach( (val:any[]) => {
        this.dataPoints.push({x: val[0], y: parseInt(val[1])});
        this.xValue++;
        this.yValue = parseInt(val[1]);
      })
    } else {
      //this.dataPoints.shift();
      this.dataPoints.push({x: data[0][0], y: parseInt(data[0][1])});
      this.xValue++;
      this.yValue = parseInt(data[0][1]);
    }
    this.newDataCount = 1;
    this.chart.render();
    this.timeout = setTimeout(this.updateData, 1000);
  }


}
