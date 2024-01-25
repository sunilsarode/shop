import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  cartItems: ShoppingCartItem[]=[];
  

  constructor(public itemsMap: { [productID:string]:ShoppingCartItem}){
    Object.entries(itemsMap || {}).forEach(([key, item]) => {
      this.cartItems.push(new ShoppingCartItem(item.product,item.quantity,));
    });
  }

  get totalItemsCount() {
    let count = 0;
    Object.entries(this.itemsMap || {}).forEach(([key, item]) => {
      count += item.quantity;
    });

    return count;
  }

  get totalPrice(){
    let sum=0;
    
    this.cartItems.forEach((item)=>{
      sum+=item.totalPrice
    })

    return sum;
  }

  getQuantity(product:Product) {
    return this.itemsMap?.[product.key]?.quantity || 0
  }
}
