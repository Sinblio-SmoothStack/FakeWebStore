import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ProductInfoService {

  selected: Product | undefined;

  constructor(private http:HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>("https://fakestoreapi.com/products");
  }

  getProductsFromCategory(category: string) {
    return this.http.get<Product[]>("https://fakestoreapi.com/products/category/" + category);
  }

  getProduct(productId: string) {
    return this.http.get<Product>("https://fakestoreapi.com/products/" + productId);
  }

  setSelected(toSelect: Product) {
    this.selected = toSelect;
  }

  getSelected() {
    return this.selected;
  }
}
