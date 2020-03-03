import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import{Product} from '../models/product'
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection ;
  productDoc;
  products:Observable<Product[]> ;

  constructor(public db:AngularFirestore) { 

    // this.products = db.collection('products').valueChanges() ;

    this.productsCollection =  this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions=>{
      return actions.map(a=>{
        const data =a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    }))

  }

  getProducts(){
    return this.products;
  }

  // deleteProduct(product:Product){
  //   this


  // }
}
