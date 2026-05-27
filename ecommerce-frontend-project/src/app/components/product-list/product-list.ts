import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-table.html',
  styleUrl: './product-list.css',
})
export class ProductList {

    constructor(private productService: ProductService) {}

    products: Product[] = [];

    ngOnInit() {
        this.listProducts();
    }

    listProducts() {
        this.productService.getProductList().subscribe(data => {
            this.products = data;
        });
    }
}
