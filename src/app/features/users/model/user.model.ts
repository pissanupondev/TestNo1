export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDay: string;
  sex: string;
  occupation: string;
  profile: string;
  contentType: string;
}

export interface ICreateUserResponseData {
  id: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;                             
  errors?: Record<string, string[]>;
}