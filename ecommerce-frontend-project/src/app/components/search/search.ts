import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
   keyword: string = '';



  constructor(private router : Router){}

  ngOnInit() {
   }

   doSearch(val: string){
    this.router.navigateByUrl(`/search/${val}`);
   }

}
