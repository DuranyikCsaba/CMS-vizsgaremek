export interface User {
    id: number;
    nev: string;
    email: string;
    tel: string;
  }
  
  export interface UserResponse {
    error: boolean;
    message: string;
    users: User[];
  }

  export interface PromoteResponse {
    message: string;
}

export interface DemoteResponse {
  message: string;
}