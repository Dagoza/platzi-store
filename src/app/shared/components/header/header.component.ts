import { Component, HostListener } from '@angular/core';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  total$: Observable<number>;
  installEvent = null;

  constructor(
    private cartService: CartService
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
      );
  }
 
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeprompt(event: Event) {
    console.log(event);
    event.preventDefault();
  }

  installByUser(){
    if(this.installEvent){
      this.installEvent.prompt();
      this.installEvent.userChoice()
      .then(rta => {
        console.log(rta);
        
      })
    }
  }

}
