import { Component, OnInit } from '@angular/core';
import {Product} from "../../../interfaces/product";
import {HttpClient} from "@angular/common/http";
import {ProductInfoService} from "../../../services/product-info.service";
import {ActivatedRoute, RouterModule, NavigationExtras, Router} from "@angular/router";
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  categories: string[] = ["All"];
  search: string = "";
  selectedId: number = 0;
  selected = ""
  filteredProducts: Product[] = [];

  constructor(private http:HttpClient, private productInfoService: ProductInfoService) { }

  ngOnInit(): void {
    this.getCategories()
    this.getProducts()
  }

  getCategories() {
    this.http.get<string[]>("https://fakestoreapi.com/products/categories").subscribe(
      (data) => {
        data.forEach((x) => this.categories.push(x))
      }
    );
  }

  getProducts() {
    this.productInfoService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      }
    );
  }

  updateProducts() {
    if (this.selected == "") {
      this.productInfoService.getAllProducts().subscribe(
        (data) => {
          this.products = data;
        }
      );
    } else {
      this.productInfoService.getProductsFromCategory(this.selected).subscribe(
        (data) => {
          this.products = data;
        }
      );
    }
    if (this.search != "") {
      this.filteredProducts = [];
      this.products.forEach((x: Product) => {
        if(x.title.toLowerCase().includes(this.search.toLowerCase()))
          this.filteredProducts.push(x);
      })
      this.products = this.filteredProducts;
    }
  }


  setSelected(selected: Product) {
    this.productInfoService.setSelected(selected);
  }
}
