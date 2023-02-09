import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Datasens } from "../models/datasens.model";

@Injectable({
  providedIn: 'root'
})
export class DatasensService {

  private dbPath = '/datasens/';
  dataSensRef: AngularFireList<Datasens>;
  dataSensRefDet: AngularFireList<Datasens> | undefined;
  private ruta = ""

  constructor(private db: AngularFireDatabase) {
    this.dataSensRef = db.list(this.dbPath+"sensor1")
  }

  getAll() {
    return this.db.list(this.dbPath).snapshotChanges();
  }

  getOne2(key: string | null | undefined): AngularFireList<Datasens> {
    this.ruta = "/datasens/"+key;
    this.dataSensRefDet = this.db.list(this.ruta)
    return this.dataSensRefDet;

  }

  getOne(key: string | null){
    console.log("llega key",key)
    this.ruta = "/datasens/"+key;
    return this.db.object(this.ruta);
  }

  getDetailOne(key: string | null | undefined){
    console.log("llega key",this.ruta+"/"+key)
    return this.db.list(this.ruta+"/"+key);
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
