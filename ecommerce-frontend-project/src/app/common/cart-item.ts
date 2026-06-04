import { Product } from "./product";

export class CartItem {

  id:number;
  name:string;
  imageUrl:string | undefined;
  unitPrice:number;
  quantity:number;

  constructor(productor: Product) {
    this.id = productor.id ?? 0;
    this.name = productor.name ?? "";
    this.unitPrice = productor.unitPrice ?? 0;
    this.imageUrl = productor.imageUrl;
    this.quantity = 1;
  }

}
