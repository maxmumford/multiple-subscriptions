import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';

// services
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// components
import { AppComponent }  from './app.component';
import { HomeComponent }  from './home.component';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
}

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
