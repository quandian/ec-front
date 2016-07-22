import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavMenuListComponent } from '../nav-menu-list';

@Component({
  selector: 'footer-bar',
  template: require('./footer-bar.html'),
  directives: [NavMenuListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBarComponent {
  @Input() show: boolean = true;

  get display() { return this.show ? 'block' : 'none'; }
}
