export interface Response {
  status: number;
  message: string;
  errors: string[];
  data: any;
}

export class ApiResponse {
  static Error = (
    message: string = 'Error',
    errors: string[] = [],
  ): Response => {
    return {
      status: 0,
      data: '',
      message,
      errors,
    };
  };

  static Success = (data: any = '', message: string = 'Success'): Response => {
    return {
      status: 1,
      errors: [],
      data,
      message,
    };
  };
}
