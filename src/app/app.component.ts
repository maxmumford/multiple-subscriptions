import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  encapsulation: ViewEncapsulation.None // applies app.component.scss to the whole page
})
export class AppComponent {

  constructor(
    private router: Router,
    private angularFire: AngularFire,
  ){}

}
