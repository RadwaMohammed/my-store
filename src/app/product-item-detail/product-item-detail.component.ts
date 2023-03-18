import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/Product';
@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  products: Product[] = [];
  product: Product;
  quantityList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantity: string = '1'; // Default value is 1
  id: string = '';
  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) {
    // Initialize the product
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: '',
      quantity: 1
    }

  }

  ngOnInit(): void {
    // Get the id from url params
    this.id = this.route.snapshot.paramMap.get('id') || '';
    // To initialize the component with data
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      // Find product with id
      this.product = this.products.find((p: Product): boolean => p.id === +this.id) || this.product;
      // Add qunatity to Products.json as it doesn't have quantity in the product object
      this.product['quantity'] = 1;
    });
  }
  // Update the quantity accourding to the user select option
  updateQuantity(event: Event): void {
    this.quantity = event.target && (event.target as HTMLSelectElement).value || this.quantity;
  }

  // Adding a product to the cart
  addProductToCart(): void {
    this.cartService.addProduct(this.product, +this.quantity);
    alert('Added to cart!!!');
  }
}
