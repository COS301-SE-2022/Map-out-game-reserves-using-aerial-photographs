import { Component, OnInit } from '@angular/core';
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
} from '@angular/material/tooltip';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 500,
  touchendHideDelay: 1000,
};
@Component({
  selector: 'aerial-mapping-side-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
  ],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // document.getElementById('dashboard')!.className += ' active';
    // var header = document.getElementById('buttons')!;
    // var btns = header.getElementsByClassName('menu-button');
    // for (var i = 0; i < btns.length; i++) {
    //   btns[i].addEventListener('click', function (this: any) {
    //     var current = document.getElementsByClassName('active');
    //     if (current.length > 0) {
    //       current[0].className = current[0].className.replace(' active', '');
    //     }
    //     var url = this.router.url;
    //     console.log(url);
    //     var page = url.split('/');

    //     this.className += ' active';
    //   });
    // }
  }

  onClick(id: string): void {
    // Add active class to the current button (highlight it)
    // let header = document.getElementById("buttons")!;
    // let btns = header.getElementsByClassName("menu-button");

    // for (let i = 0; i < btns.length; i++) {
    //   btns[i].addEventListener("click", function() {
    // let current = document.getElementsByClassName('active'); //possibly need menu-button infront
    // if (current.length > 0) {
    //   current[0].className = current[0].className.replace(' active', '');
    //   console.log('rhino beetle');
    // }
    // console.log('dung beetle');
    // let btn = document.getElementById(id)!;
    // btn.className += ' active';
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }
}