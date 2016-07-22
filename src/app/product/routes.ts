import { RouterConfig } from '@angular/router';
import { ProductRouteComponent } from './product-route.component';
import { ProductsPageComponent } from './products';
import { ProductPageComponent, ProductInfoComponent, ProductDetailComponent, ProductEvalComponent } from './product';
import { AddressSelectorPageComponent } from './address-selector';
import { AddressCreatorPageComponent } from './address-creator';

export const routes = {
  path: 'product',
  component: ProductRouteComponent,
  children: [
    {
      path: 'list',
      component: ProductsPageComponent
    },
    {
      path: '1/:id',
      component: ProductPageComponent,
      children: [
        {
          path: '', // info
          component: ProductInfoComponent
        },
        {
          path: 'detail',
          component: ProductDetailComponent
        },
        {
          path: 'eval',
          component: ProductEvalComponent
        }
      ]
    },
    {
      path: 'addrs',
      component: AddressSelectorPageComponent
    },
    {
      path: 'addr-creator',
      component: AddressCreatorPageComponent
    }
  ]
};
