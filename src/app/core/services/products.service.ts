import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../shared/models/product';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  uri = 'http://localhost:4000/products';

  constructor(private http: HttpClient) {
  }

  addProduct(ProductName = 'Friends', ProductDescription = 'Cool TV show', ProductPrice = 149.90, Img = 'url') {
    const obj = {
      name: ProductName,
      description: ProductDescription,
      price: ProductPrice,
      img: Img,
    };
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'), err => console.error(err));
  }

  getProductsList(pageSize?: number, page?: number, keyword?: string): Observable<{ products: Product[], pages: number }> {
    return new Observable(observer => {
      keyword = keyword ? keyword.trim() : '';
      const params = !isNullOrUndefined(page) ? {params: {pagesize: pageSize.toString(), page: page.toString(), keyword: keyword}} : {};
      this.http.get(this.uri, params).subscribe(res => observer.next(res as { products: Product[], pages: number }),
        err => observer.error(err));
    });
  }

  getProductById(productId: string): Observable<Product> {
    return new Observable(observer => {
      this.http.get(this.uri + '/edit/' + productId).subscribe(res => observer.next(res as Product), err => observer.error(err));
    });
  }

  getProductsByIds(ids: string[]): Observable<Product[]> {
    const params = {params: {ids: ids}};
    return new Observable(observer => {
      this.http.get(this.uri + '/specific', params).subscribe(res => observer.next(res as Product[]), err => observer.error(err));
    });
  }
}
