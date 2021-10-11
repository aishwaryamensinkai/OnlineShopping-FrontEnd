import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  filterArray = ["Clay", "Wooden", "Ceramic"]
  product = null;
  itemsCart: any = [];
  cartNumber: number = 0;
  isVisible: boolean = false;
  popup: boolean = false;
  viewProduct: any;
  public searchFilter: any = '';
  query: any;
  products: any;
  tempArray: any;

  constructor(private service: RegistrationService, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(async (data) => {
      this.products = await data;
      this.tempArray = this.products;
    });
  }

  filter(value: String) {
    var p: any = [];
    this.tempArray.forEach((product: { category: String; }) => {
      if (product.category == value) {
        p.push(product);
      }
      else if (value == "All") {
        p.push(product);
      }
    });
    this.products = p;
  }

  showPopFuction(product: any) {
    // console.log(product);
    this.popup = true;
    this.viewProduct = product;
  }

  addToCart(product: any) {
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any = [];
      storeDataGet.push(product);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else {
      var id = product.productId;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart') || '{}');
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (parseInt(id) === parseInt(this.itemsCart[i].productId)) {
          this.itemsCart[i].quantity = product.quantity;
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(product);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunction();
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(() => this.isVisible = false, 1000);
  }

  cartNumberFunction() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '{}');
    this.cartNumber = cartValue.length;
    this.service.cartSubject.next(this.cartNumber);
  }

  increaseQuantity(product: any) {
    if (product.quantity < 12)
      product.quantity += 1;
    console.log(product.quantity);
  }

  decreaseQuantity(product: any) {
    if (product.quantity != 1)
      product.quantity -= 1;
    console.log(product.quantity);
  }
}
