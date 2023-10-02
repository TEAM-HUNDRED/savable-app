export type GiftCardListAPIResponse = Array<{
  giftcardId: number;
  image: string;
  productName: string;
  price: number;
  brandName: string;
}>;

export type OrderHistoryAPIResponse = Array<{
  date: string;
  image: string;
  productName: string;
  price: number;
  brandName: string;
  quantity: number;
  sendState: string;
}>;
