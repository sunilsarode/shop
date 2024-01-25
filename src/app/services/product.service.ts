import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { 
  }
  create(value: any) {
    this.db.list('/products').push(value);
  }


  getAll(): Observable<Product[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => {
          const data = c.payload.val() as Product;
          return { ...data, key: c.payload.key } as Product;
        });
      })
    );
  }

  get(id:string){
    return this.db.object('/products/'+id).valueChanges() as Observable<Product>;
  }

  update(id:string,product:Product){
    this.db.object('/products/' +id).update(product);
  }

  delete(id:string){
    return this.db.object('/products/'+ id).remove()
  }
}
