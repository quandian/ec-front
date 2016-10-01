import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs/Rx";
import { IProduct, ProductService, IProductQuery, LocalProductBase } from '../../core';

const SEARCH_COLS = ['Name', 'Intro', 'Detail'];

@Component({
  template: require('./products-page.html'),
  styles: [require('./products-page.css')],
})
export class ProductsPageComponent {

  filtered: IProduct[];
  grid: boolean;

  private _filter: string;
  private _products: IProduct[] = [];

  constructor(
    private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private base: LocalProductBase,
    private productService: ProductService) { }

  ngOnInit() {
    let query = <IProductQuery>this.route.snapshot.queryParams;
    this.productService.query(query).subscribe(items => {
      this.products = items;
    });
  }

  get togglerClass() { return this.grid ? 'browse-grid' : 'browse-list'; }
  get containerClass() { return this.grid ? 'grid' : 'list'; }

  get products() { return this._products; }
  set products(items: IProduct[]) {
    this.filtered = this._products = items;
    this.filter = '';
  }

  get filter() { return this._filter; }
  set filter(filter: string) {
    if (this._filter !== filter) {
      this._filter = filter;
      this.filtered = filter ?
        this.products.filter(product => SEARCH_COLS.some(col => !!(<string>product[col]).match(filter))) :
        this.products;
    }
  }

  onGotoProduct(product: IProduct) {
    this.productService.current = Observable.of(product);
    this.router.navigate(['/product/1', product.ID]);
  }

  onGoBack() { this._location.back(); }

}
