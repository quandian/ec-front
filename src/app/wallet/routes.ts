import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { WalletRouteComponent } from './wallet-route.component';
import { WalletComponent } from './wallet.component';
import {
  BalanceComponent,
  BalanceDepositComponent,
  BalanceRefillComponent,
  BalanceWithdrawComponent
} from './balance';
import { PointsComponent } from './points';
import { RewardComponent } from './reward';

export const routes :Routes= [
  {
    path: 'wallet',
    component: WalletRouteComponent,
    children: [
      {
        path: '', // wallet
        component: WalletComponent
      },
      {
        path: 'balance', // balance
        component: BalanceComponent,
        children: [
          {
            path: '', // deposit
            component: BalanceDepositComponent
          },
          {
            path: 'refill',
            component: BalanceRefillComponent
          },
          {
            path: 'withdraw',
            component: BalanceWithdrawComponent
          }
        ]
      },
      {
        path: 'points',
        component: PointsComponent
      },
      {
        path: 'reward',
        component: RewardComponent
      },
    ]
  },
];

export const walletRouting: ModuleWithProviders = RouterModule.forChild(routes);
