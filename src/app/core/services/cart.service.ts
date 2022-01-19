import {Injectable} from '@angular/core';
import {Product} from '../../shared/models/product';
import {ProductsService} from './products.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public readonly CART: string = 'cart';
  public totalPrice: number = 0;
  public productsIdsInCart: string[] = [];

  constructor(private productsService: ProductsService) {
  }

  init() {
    return new Observable(observer => {
      this.retrieveCartFromLocalStorage();
      if (this.productsIdsInCart && this.productsIdsInCart.length > 0) {
        this.productsService.getProductsByIds(this.productsIdsInCart).subscribe(products => {
          console.log(products);
          products.forEach(product => this.totalPrice += product.price);
        }, err => console.error(err));
      }
      observer.next();
    });
  }

  public isProductInCart(productId: string): boolean {
    return this.productsIdsInCart.indexOf(productId) !== -1;
  }

  public addItemToCart(product: Product) {
    this.productsIdsInCart.push(product._id);
    this.totalPrice += product.price;
    this.saveCartStateToLocalStorage();
  }

  public removeItemFromCart(product: Product) {
    const productIndexInCart: number = this.productsIdsInCart.indexOf(product._id);
    if (productIndexInCart !== -1) {
      this.productsIdsInCart.splice(productIndexInCart, 1);
      this.totalPrice -= product.price;
    }
    this.saveCartStateToLocalStorage();
  }


  private retrieveCartFromLocalStorage() {
    const data = localStorage.getItem(this.CART);
    if (data) {
      try {
        this.productsIdsInCart = JSON.parse(localStorage.getItem(this.CART));
      } catch (e) {
        // do nothing
      }
    }
  }

  private saveCartStateToLocalStorage() {
    localStorage.setItem(this.CART, JSON.stringify(Array.from(this.productsIdsInCart)));
  }
}
