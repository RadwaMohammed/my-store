import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from './../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService) {}
  // Code during initialization
  ngOnInit(): void {
    // To initialize the component with data
    this.productService.getProducts().subscribe(res => {
      // Add qunatity to Products.json as it doesn't have quantity in the product object
      for (let i = 0; i < res.length; i++) {
        const product = res[i];
        // Set the initiale value to 1
        product['quantity'] = 1;
      }
      this.products = res;
    });
  }
}
