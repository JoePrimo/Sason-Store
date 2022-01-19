import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../core/services/products.service';
import {Product} from '../shared/models/product';
import {CartService} from '../core/services/cart.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public readonly PAGE_SIZE: number = 5;
  public busy: boolean;
  public productsListPages: { product: Product, inCart: boolean }[][] = [];
  public currentPage: number;
  public totalPages: number;
  public searchBox: FormControl = new FormControl();


  constructor(private productsService: ProductsService, public cartService: CartService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.searchBox.valueChanges.pipe(debounceTime(400)).subscribe(keyword => this.getPage(0, keyword));
    this.getPage(0);
  }

  getPage(pageIndex: number, keyword: string = this.searchBox.value) {
    this.busy = true;
    this.productsService.getProductsList(this.PAGE_SIZE, pageIndex, keyword).subscribe(productsData => {
      if (pageIndex === 0) {
        this.totalPages = productsData.pages;
        this.productsListPages = Array(this.totalPages).fill([]);
      }
      this.productsListPages[pageIndex] = productsData.products.map(item => ({
        product: item,
        inCart: this.cartService.isProductInCart(item._id)
      }));
      this.currentPage = pageIndex;
      this.busy = false;
    }, err => {
      this.busy = false;
      console.error(err);
    });
  }

  changePage(nextPage: boolean = true) {
    const wantedPage = nextPage ? this.currentPage + 1 : this.currentPage - 1;
    if (wantedPage >= 0 && wantedPage < this.totalPages) {
      if (this.productsListPages[wantedPage].length === 0) {
        this.getPage(wantedPage);
      } else {
        this.currentPage = wantedPage;
      }
    }
  }


  onActionClicked(event, productData: { product: Product, inCart: boolean }) {
    event.stopPropagation();
    const inCart: boolean = !productData.inCart;
    const product: Product = productData.product;
    if (inCart) {
      this.cartService.addItemToCart(product);
    } else {
      this.cartService.removeItemFromCart(product);
    }
    productData.inCart = inCart;
  }

}
