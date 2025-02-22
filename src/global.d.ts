type Keys<T> = keyof T;
type Values<T> = T[Keys<T>];
