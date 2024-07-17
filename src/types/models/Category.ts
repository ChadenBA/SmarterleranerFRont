export interface Children {
  id?: number;
  title: string;
}

export interface Category {
  id?: number;
  title: string;
  children: Children[];
}
