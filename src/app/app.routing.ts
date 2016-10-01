import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
