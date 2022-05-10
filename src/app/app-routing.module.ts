import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {ProductsComponent} from "./components/pages/products/products.component";
import {ProductPageComponent} from "./components/pages/product-page/product-page.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "catalog",
    component: ProductsComponent
  },
  {
    path: "product",
    component: ProductPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
