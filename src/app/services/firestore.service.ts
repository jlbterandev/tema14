import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { Item } from '../models/Item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  public getImagen(): Observable<Item[]> {
    return this.firestore
      .collection('imagenes')
      .valueChanges()
      .pipe(map(this.treatData));
  }

  private treatData(data: any[]): Item[] {
    return data.map((item: any) =>
    (
      { id: item.id , text: item.text , img: item.img }
    ));
  }

  public updateImageData(id: string, nuevaimagen: string) {
    this.firestore
      .collection('imagenes') // Referenciamos la lista de tareas.
      .doc(id + '')
      .update( { img: nuevaimagen });
  }
}
