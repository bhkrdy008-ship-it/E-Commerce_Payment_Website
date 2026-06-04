import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../common/cart-item';
import { CartServices } from '../../services/cart-services';

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

  // pagination properties
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  previousCategoryId: number = 1;

  constructor(private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartServices) { }

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

     addToCart(tempProduct: Product) {
      console.log(`Adding to cart: ${tempProduct.name}, ${tempProduct.unitPrice}`);

      const theCartItem = new CartItem(tempProduct);
      this.cartService.addToCart(theCartItem);
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

    // if category changed, reset page number to 1
    if (this.currentCategoryId !== this.previousCategoryId) {
      this.thePageNumber = 1;
      this.previousCategoryId = this.currentCategoryId;
    }

    // now get the products for the given category id with pagination
    this.productService.getProductListPaginated(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      (data: any) => {
        this.products = data._embedded.products;
        this.theTotalElements = data.page.totalElements;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
      }
    )
  }
}
