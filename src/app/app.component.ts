import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { NavigationEnd, Router } from '@angular/router';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

declare var gtag;
interface Token {
  token: string;
}

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private tokensCollections: AngularFirestoreCollection<Token>;

  constructor(
    private router: Router,
    private swUpdate: SwUpdate,
    private messaging: AngularFireMessaging,
    private databaseFire: AngularFirestore
    ){
    const navEndEvent$ = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvent$.subscribe(
      (event: NavigationEnd) => {
        gtag('config', 'G-84G7HRBCC8', {page_path: event.urlAfterRedirects});
      });
    this.tokensCollections = this.databaseFire.collection<Token>("tokens");
  }

  ngOnInit(): void {
    this.updatePWA();
    this.requestPermission();
    this.listenNotifications();
  }

  updatePWA(): void{
    this.swUpdate.available.subscribe(
      (value: UpdateAvailableEvent) => {
        console.log(value);
        window.location.reload();
      });
  }

  requestPermission(){
    this.messaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.tokensCollections.add({token});
      });
  }

  listenNotifications(){
    this.messaging.messages
    .subscribe(
      (message) => {
        console.log(message);
      });
  }
}
