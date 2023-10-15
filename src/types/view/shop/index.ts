export type GiftCardPropsType = {
  id: number;
  image: string;
  productName: string;
  price: number;
  brandName: string;
};

export type OrderHistoryPropsType = {
  date: string;
  image: string;
  productName: string;
  productPrice: number;
  totalPrice: number;
  brandName: string;
  quantity: number;
  sendState: string;
};
