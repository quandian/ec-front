import { Component, Optional, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import {Response}from '@angular/http';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { constMap, removeURLParameter, IUserInfo, UserService, IWallet, MoneyService, IOrder, OrderService } from '../../core';

enum PayType { none, wx, cash, points }

@Component({
  selector: 'order-pay',
  templateUrl: './pay.html',
  styleUrls: ['./pay.css'],
})
export class OrderPayComponent {

  @Input() order: IOrder;

  @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();

  // tslint:disable-next-line:variable-name
  PayType = PayType;
  payType = PayType.none;
  user: IUserInfo;
  wallet: IWallet;
  vpn: number;
  error: string;
  key: string;
  keyControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private moneyService: MoneyService,
    private userService: UserService,
    private orderService: OrderService) { }

  get valid(): boolean {
    switch (this.payType) {
      case PayType.wx:
        return !this.order.PayPoints;
      case PayType.cash:
        return !this.order.PayPoints && this.wallet.cash >= this.order.PayAmount && this.keyControl.valid;
      case PayType.points:
        return this.order.PayPoints && this.wallet.points >= this.order.PayPoints && this.keyControl.valid;
      default:
        return false;
    }
  }

  ngOnInit() {
    Observable.forkJoin(
      this.userService.getUserinfo().take(1),
      this.moneyService.getWallet().take(1),
    ).subscribe(([user, wallet]: [IUserInfo, IWallet]) => {
      this.user = user;
      this.wallet = wallet;
    });
    this.vpn = this.order.Items[0].Vpn;
    let paying = +this.route.snapshot.queryParams['paying'];
    if (paying === this.order.ID) {
      this.showChange.next(true);
      this.location.replaceState(removeURLParameter(this.router.url, 'paying').url);
    }
  }

  onDismiss() {
    this.error = '';
    this.show = false;
    this.showChange.next(false);
  }

  gotoSetPayKey() {
    this.location.replaceState(this.router.url, `paying=${this.order.ID}`);
    this.router.navigateByUrl('/safe/paykey');
  }

  onPay() {
    if (this.valid) {
      switch (this.payType) {
        case PayType.wx:
          this.orderService.wxPay(this.order).subscribe(
            _ => this.payOk(),
            (err) => this.error = err,
          );
          break;
        case PayType.cash:
        case PayType.points:
          this.orderService.pay(this.order, this.key).subscribe(
            _ => this.payOk(),
            (err:Response) => this.error = err.text(),
          );
          break;
        default:
      }
    }
  }

  private payOk() {
    this.router.navigate(['/order/detail', this.order.ID]);
  }

}
