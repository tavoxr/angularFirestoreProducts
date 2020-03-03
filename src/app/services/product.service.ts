import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import{Product} from '../models/product'
import {Observable} from 'rxjs';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection;
  productDoc;
  products:Observable<Product[]> ;

  constructor(public db:AngularFirestore) { 

    this.products = db.collection('products').valueChanges() ;

  }

  getProducts(){
    return this.products;
  }
}
