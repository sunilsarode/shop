import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from '../models/product';
import { Observable, map, take } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  
  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()

    })
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId=await this.getCartOrCreateCartId()
    return this.db.object('/shopping-carts/'+ cartId).valueChanges()
    .pipe(map((x:any)=> {  
      return new ShoppingCart(x?.items) } ))
  }

  private async getCartOrCreateCartId():Promise<string>{

    let cartId =localStorage?.getItem('cartId');

    if(!cartId){
       let result=await this.create();
       if(result.key){
        localStorage?.setItem('cartId', result.key)
        return result.key
       }
      return '';
    }else{
      return cartId;
    }
  }

 async addToCart(product: Product,decreaseQuant?:boolean) {
    let cartId=await this.getCartOrCreateCartId();
    let productItem =this.db.object('/shopping-carts/'+cartId + '/items/'+product.key)

    productItem.valueChanges().pipe(take(1)).subscribe((item)=>{
      if(item){
       
       let  quantity=(item as any).quantity + (decreaseQuant ? -1 : 1);
       if(quantity ===0){
          productItem.remove();
       }else{
        productItem.update({quantity: quantity})
       }
        
      }else{
       productItem.set({ product: product,
        quantity: 1})   
      }
    })
  }

  decreaseQuant(product: Product) {
    this.addToCart(product,true)
  }

 async clearCart() {
    let cartId=await this.getCartOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId + '/items').remove();
  }
}
