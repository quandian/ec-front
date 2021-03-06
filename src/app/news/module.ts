import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';

import { newsRouting } from './routes';

import { NewsComponent } from './news.component';
import { NewsDetailComponent } from './news-detail.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsDetailComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    newsRouting,
  ],
  exports: [
    NewsComponent,
    NewsDetailComponent,
  ],
})
export class NewsModule { }
