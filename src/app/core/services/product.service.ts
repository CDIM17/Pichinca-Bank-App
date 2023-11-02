import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product.interface';
import { Observable, map } from 'rxjs';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private baseService:BaseService) { }

  getProducts():Observable<Product[]>{
    return this.baseService.get<Product[]>(base_url)
  }

  getProductById(id: string): Observable<Product> {
    return this.baseService.getById<Product[]>(base_url, id).pipe(
      map(products => {
        if (products.length === 0) {
          throw new Error('Product not found');
        }
        return products[0];
      })
    );
  }

  createProduct(payload:Product):Observable<Product>{
    return this.baseService.post<Product>(base_url,payload)
  }

  updateProduct(id:string,payload:Product):Observable<Product>{
    return this.baseService.put<Product>(base_url,id,payload)
  }

  saveProduct(product: Product,id:string = ''): Observable<Product> {
    let saveOperation$: Observable<Product>;
    const payload: Product = { ...product };
    if (id && id !== '') {
      saveOperation$ = this.updateProduct(product.id,product);
    } else {
      saveOperation$ = this.createProduct(payload);
    }
    return saveOperation$
  }

  deleteProduct(id:string):Observable<Product[]>{
    return this.baseService.delete<Product[]>(base_url,id)
  }

  getProductVertification(id:string):Observable<Boolean>{
    return this.baseService.getById<Boolean>(`${base_url}/verification`,id)
  }


}
