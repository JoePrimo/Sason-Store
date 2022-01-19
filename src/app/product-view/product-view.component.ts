import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../shared/models/product';
import {ProductsService} from '../core/services/products.service';
import {CartService} from '../core/services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  public product: Product;
  public inCart: boolean;
  public busy: boolean = true;

  constructor(private productsListService: ProductsService, private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.productsListService.getProductById(productId).subscribe(res => {
          this.product = res;
          this.inCart = this.cartService.isProductInCart(res._id);
          this.busy = false;
        }, err => {
          console.error(err);
          this.busy = false;
        });
      } else {
        this.busy = false;
      }
    });
  }

  changeCartStatus() {
    if (this.inCart) {
      this.cartService.removeItemFromCart(this.product);
    } else {
      this.cartService.addItemToCart(this.product);
    }
    this.inCart = !this.inCart;
  }

}
