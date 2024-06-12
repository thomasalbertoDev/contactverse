export class WebResponse<T> {
  status: boolean;
  message: string;
  data?: T;
  errors?: string;
  pagging?: Pagging;
}

export class Pagging {
  size: number;
  total_page: number;
  current_page: number;
}
