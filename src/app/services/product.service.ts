import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import{Product} from '../models/product'
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product> ;
  productDoc: AngularFirestoreDocument<Product> ;
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

  addProduct(product: Product){
    this.productsCollection.add(product);

  }



   deleteProduct(product:Product){
     this.productDoc = this.db.doc(`products/${product.id}`);
     this.productDoc.delete();


   }
}
