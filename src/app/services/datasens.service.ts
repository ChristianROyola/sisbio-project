import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Datasens } from "../models/datasens.model";

@Injectable({
  providedIn: 'root'
})
export class DatasensService {

  private dbPath = '/datasens/sensor1';
  dataSensRef: AngularFireList<Datasens>;

  constructor(private db: AngularFireDatabase) {
    this.dataSensRef = db.list(this.dbPath)
  }

  getAll(): AngularFireList<Datasens> {
    return this.dataSensRef;
  }

  create(dataSens: Datasens): any {
    return this.dataSensRef.push(dataSens);
  }

  update(key: string, value: any): Promise<void> {
    return this.dataSensRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.dataSensRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.dataSensRef.remove();
  }

}
