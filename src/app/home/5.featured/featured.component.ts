import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService } from '../../core';

@Component({
  selector: 'home-featured',
  templateUrl: './featured.html',
  styleUrls: ['./featured.css'],
})
export class HomeFeaturedComponent {

  first: IProduct[]; // first item
  items: IProduct[];
  prices: Dict<number> = {};

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['购特色'], sz: 2 + 4 * 2 })).
      take(1).subscribe(items => {
        items.forEach(item => this.prices[item.ID] = item.skus.map(sku => sku.SalePrice).sort().shift());
        this.first = items.slice(0, 2);
        items = items.slice(2);
        this.items = items.slice(0, Math.floor(items.length / 4) * 4 + 4);
      });
  }

  gotoProduct(product: IProduct) {
    this.productService.setCurrent(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.HomeImg || product.Img || product.skus[0].Img; }

}
