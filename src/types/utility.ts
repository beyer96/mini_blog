// Utility type to extract only non-method properties from a type T
export type PropertiesOnly<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
