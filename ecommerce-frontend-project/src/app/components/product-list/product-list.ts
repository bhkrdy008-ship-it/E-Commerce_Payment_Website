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

    products: Product[] = []
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 5
  theTotalElements: number = 0;
  previousCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    if(this.currentCategoryId != this.previousCategoryId){
      this.pageNumber = 1;
    }

    // now get the products for the given category id
    this.productService.getProductListPaginated(this.pageNumber - 1, this.pageSize, this.currentCategoryId).subscribe(
      data => {
        this.products = data._embedded.products;
        this.theTotalElements = data.page.totalElements;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
      }
    )
  }
}
