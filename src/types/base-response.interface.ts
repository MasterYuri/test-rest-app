export interface BaseListResponseInterface<T> {
  items: T[];
  total: number;
}

export interface BaseResponseInterface<T> {
  item: T;
}
