import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductInfoService} from "../../../services/product-info.service";
import {Product} from "../../../interfaces/product";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  selectedProduct: Product | undefined;
  relatedProducts: Product[] = [];

  constructor(private http:HttpClient, private productInfoService: ProductInfoService) { }

  ngOnInit(): void {
    this.getSelected();
  }

  getRelatedProducts() {
    if (this.selectedProduct != undefined)
      this.productInfoService.getProductsFromCategory(this.selectedProduct.category).subscribe(
        (products) => {
          products.forEach((product) => {
            if (this.selectedProduct != undefined && product.id != this.selectedProduct.id)
              this.relatedProducts.push(product);
          });
        }
      )
  }

  setSelected(selected: Product) {
    this.productInfoService.setSelected(selected);
    this.getSelected()
  }

  getSelected() {
    this.selectedProduct = this.productInfoService.getSelected();
    this.getRelatedProducts();
    this.relatedProducts=[];
  }
}
