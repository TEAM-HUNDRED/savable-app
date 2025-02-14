export type GiftCardListAPIResponse = Array<{
  id: number;
  image: string;
  productName: string;
  price: number;
  brandName: string;
}>;

export type OrderHistoryAPIResponse = Array<{
  date: string;
  image: string;
  productName: string;
  productPrice: number;
  totalPrice: number;
  brandName: string;
  quantity: number;
  sendState: string;
}>;

export type CreateOrderPayload = {
  giftcardId: number;
  quantity: number;
  positivePoint: string;
  negativePoint: string;
  wishChallenge: string;
};

export type CreateOrderAPIResponse = {};
