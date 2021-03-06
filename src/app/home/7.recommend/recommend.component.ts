import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct, ProductService } from '../../core';

@Component({
  selector: 'home-recommend',
  templateUrl: './recommend.html',
  styleUrls: ['./recommend.css'],
})
export class HomeRecommendComponent {

  items: IProduct[];

  constructor(
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAttrs().
      flatMap(attrs => this.productService.query({ ft: attrs.specials['推荐'], sz: 100 })).
      take(1).subscribe(items => this.items = items);
  }

  gotoProducts() { this.router.navigateByUrl('/product/list'); }

  gotoProduct(product: IProduct) {
    this.productService.setCurrent(product);
    this.router.navigate(['./home/1', product.ID]); // SkuID
  }

  getImg(product: IProduct) { return product.HomeImg || product.Img || product.skus[0].Img; }

}
