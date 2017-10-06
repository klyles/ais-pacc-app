import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  searchMobileActive = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  toggleSearchMobile(  ) {
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onFullScreen() {
    const $body = $('body');
    const documentMethods = {
      enter: ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'],
      exit: ['cancelFullScreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msCancelFullScreen']
    };

    if (!$body.hasClass('full-screen')) {
      $body.addClass('full-screen');
      document.documentElement[documentMethods.enter.filter((method) => {
        return document.documentElement[method]
      })[0]]()
    } else {
      $body.removeClass('full-screen');
      document[documentMethods.exit.filter((method) => {
        return document[method]
      })[0]]()
    }
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
}
