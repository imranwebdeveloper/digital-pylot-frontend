export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  address1: string;
  address2: string;
  phone: string;
}

export interface Query {
  page: number;
  limit: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
