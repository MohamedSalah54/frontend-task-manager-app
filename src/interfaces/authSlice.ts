 interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user:{
      email:string,
      name:string,
      role:string,
      id:string,
      profileImage:string
    } | null;
    error: string | null;
  }
  
  export const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user:null,
    error: null,
  
  };
