import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list-table.html',
  styleUrl: './product-list.css',
})
export class ProductList {

    constructor(private productService: ProductService, private route: ActivatedRoute) {}

    products: Product[] = [];
    private categoryId : number = 1;
    searchMode: boolean = false;

    ngOnInit() {

      this.route.paramMap.subscribe(() => {
        this.listProducts();
      });
    }

    listProducts() {
      this.searchMode = this.route.snapshot.paramMap.has('keyword');

      if(this.searchMode){
        this.handleSearchProducts();
      }
      else {
        this.handleListProducts();
      }

    }

    handleSearchProducts() {
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

      this.productService.searchProducts(theKeyword).subscribe(data => {
        this.products = data;
      });

    }

    handleListProducts() {
   let hasId:boolean = this.route.snapshot.paramMap.has('id');

      if (hasId) {
        this.categoryId = +this.route.snapshot.paramMap.get('id')!;
      }
      else {
        this.categoryId = 1;
      }


        this.productService.getProductList(this.categoryId).subscribe(data => {
            this.products = data;
        });
    }
}
