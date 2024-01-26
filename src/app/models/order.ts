import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[] | undefined;

  constructor(
    public userID: string | undefined,
    public shopping: any,
    cart: ShoppingCart | undefined
  ) {
    this.datePlaced = new Date().getTime();

    this.items = cart?.cartItems.map((item) => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          price: item.product.price,
        },
        qunatity: item.quantity,
        totalPrice: item.totalPrice,
      };
    });
  }
}
