export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}

export interface ApiResponse {
  data: ProductInterface[];
}

export interface modalProduct {
  isOpen: boolean;
  nameProduct?: string;
  idProduct: number;
}
