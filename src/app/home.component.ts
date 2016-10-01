import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import * as firebase from "firebase";
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';

interface ItemInfo {
  name: string;
  num: number;
  type: number;
}
class Item implements ItemInfo {
  name: string;
  num: number;
  type: number;
  constructor(i: ItemInfo){
    this.name = i.name;
    this.num = i.num;
    this.type = i.type;
  }
}

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  encapsulation: ViewEncapsulation.None // applies app.component.scss to the whole page
})
export class HomeComponent {


  constructor(
    private router: Router,
    private angularFire: AngularFire
   ) { }

  ngOnInit(){
    // get all items listener
    this.angularFire.database.list('/items').subscribe(items => {
      console.log('Got items: ', items);
    });
  }

  findType1(){
    // get a subset of items
    this.angularFire.database.list('/items', {query: {
      orderByChild: "type",
      equalTo: 1
    }}).subscribe(items => {
      console.log('Found items of type 1: ', items);
    });
  }

  generateItem(type){
    let item: ItemInfo = {
      name: Math.random().toString(36).substring(7),
      num: Math.random(),
      type: type
    }
    this.angularFire.database.list('/items').push(item);
  }

  generateItems(){
    this.generateItem(1);
    this.generateItem(1);
    this.generateItem(1);
    this.generateItem(1);
    this.generateItem(1);
    this.generateItem(1);
    this.generateItem(2);
    this.generateItem(2);
    this.generateItem(2);
    this.generateItem(2);
    this.generateItem(2);
    this.generateItem(2);
    this.generateItem(2);
    this.generateItem(2);
  }

}
