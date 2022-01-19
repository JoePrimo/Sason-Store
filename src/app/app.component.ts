import {Component, OnInit} from '@angular/core';
import {CartService} from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public busy: boolean = true;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.init().subscribe(() => {
      this.busy = false;
    });
  }

}
