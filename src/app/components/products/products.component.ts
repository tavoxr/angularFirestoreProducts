import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';

import {Product} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products=[];
  editingProduct: Product;
  editing:boolean = false;
  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products=>{
      this.products = products;
      console.log(products)
    })
  }

  deleteProduct(event,product){
   this.productService.deleteProduct(product);
  }

  editProduct($event,product){
    this.editingProduct = product;
    this.editing = !this.editing;
    console.log(product);
  }

  updateProduct(){
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct= {} as Product;
    this.editing= false;

  }

}
