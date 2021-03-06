import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {
  constMap,
  IProfile,
  ModalService,
  ICartItem,
  CartService,
  WishlistService,
  ICheckoutItem,
  OrderService,
  IGroupBuyItem,
  GroupBuyService,
  IProduct,
  ISku,
  ProductAttrGroup,
  ProductService,
  LocalProductBase,
  HistoryService,
} from '../../core';

@Component({
  templateUrl: './product-page.html',
  styleUrls: ['./product-page.css'],
})
export class ProductPageComponent implements OnInit {

  profile: IProfile;
  product$: Observable<IProduct>;
  product: IProduct;

  inWishlist: boolean;
  canOpertaeWishlist: boolean = true;

  private cartLen: number;
  private showSkus: boolean;
  private groups: ProductAttrGroup[];
  private skus: ISku[];
  private groupBuyItem: IGroupBuyItem;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: ModalService,
    private orderService: OrderService,
    private groupBuyService: GroupBuyService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private historyService: HistoryService,
    private productService: ProductService,
    private base: LocalProductBase) { }

  ngOnInit() {
    let data = <{ profile: IProfile }>this.route.snapshot.data;
    this.profile = data.profile;

    if (!this.product$) {
      let id = +this.route.snapshot.params['id'];
      let skuId = +this.route.snapshot.queryParams['SkuID'];
      this.product$ = Observable.forkJoin(
        this.base.local.getItem(id).
          flatMap(product => this.productService.proccessSkus(product)),
        this.groupBuyService.getItem(skuId),
        this.cartService.getItems(),
        this.wishlistService.has(id),
      ).map(([p, groupbuy, cart, inWishlist]: [IProduct, IGroupBuyItem, ICartItem[], boolean]) => {
        this.product = p;
        this.historyService.add(p);

        this.groups = p.groups;
        this.skus = p.skus;
        this.sku = this.skus[0];

        if (groupbuy) {
          this.groupBuyItem = groupbuy;
          let sku = this.skus.find(sku => sku.ID === groupbuy.sku.ID);
          this.sku = sku;
        }

        if (skuId && this.sku) {
          this.showSkus = true;
        }

        this.setCartLen(cart);
        this.inWishlist = inWishlist;

        return p;
      }).publishReplay(1).refCount();
    }

    this.product$.subscribe(
      _ => 0,
      _ => this.product$ = null,
    );
  }

  get sku() { return this.product.sku; }
  set sku(sku: ISku) {
    sku.quantity = sku.quantity || 1;
    this.product.sku = sku;
  }

  get snapshotPice() {
    return (this.sku || this.product.skus[0]).SalePrice;
  }

  get canAddToCart() { return this.sku && this.product.Vpn === constMap.VpnType.TVpnNormal; }

  onGuanzhu() {
    if (this.canOpertaeWishlist) {
      this.canOpertaeWishlist = false;
      (this.inWishlist ? this.wishlistService.delete([this.product.ID]) : this.wishlistService.add(this.product, this.snapshotPice)).
        flatMap(_ => this.refreshWishlist()).subscribe(
        _ => this.canOpertaeWishlist = true,
        _ => this.canOpertaeWishlist = true,
      );
    }
  }

  gotoChat() { this.modal.alert(this.profile.WxMpName, '请进入微信公众号'); }
  gotoCart() { this.router.navigateByUrl('/cart'); }

  openSkus(isBuy) {
    // opened
    if (this.showSkus) {
      if (this.sku && this.sku.Stock) {
        console.log(this.sku)
        this.sku.quantity = this.sku.quantity > 1 ? this.sku.quantity : 1;
        this.sku.quantity = this.sku.quantity > this.sku.Stock ? this.sku.Stock : this.sku.quantity;
        if (isBuy) {
          let cache: ICheckoutItem = { Sku: this.sku, Quantity: this.sku.quantity };
          if (this.groupBuyItem) {
            cache.GroupBuyID = this.groupBuyItem.ID;
            cache.GroupBuyPrice = this.groupBuyItem.Price;
          }
          this.orderService.setCheckoutItemCache(cache);
          this.router.navigate(['/checkout'], { queryParams: { src: 'cache' } });
          this.showSkus = false;
        } else if (this.canAddToCart) {
          this.cartService.add(this.sku).flatMap(_ => this.cartService.getItems()).take(1).
            subscribe(items => this.setCartLen(items));
          this.showSkus = false;
        }
      }
    } else {
      this.showSkus = true;
    }
  }

  closeSkus() { this.showSkus = false; }

  private refreshWishlist() {
    this.wishlistService.clearCache();
    return this.wishlistService.has(this.product.ID).map(has => this.inWishlist = has);
  }

  private setCartLen(items: ICartItem[]) {
    return this.cartLen = items ? items.length : 0;
  }

}
