import { Component, Input, OnInit } from '@angular/core';
import { Product } from './../models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  quantityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantity: number = 1; // Default value is 1
  
  constructor() {
    // Initialize the product
    this.product = {
      id: 1,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 1
    }

  }

  ngOnInit(): void {

  }
}
