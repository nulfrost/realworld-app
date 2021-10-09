interface Base {
  email: string;
  password: string;
}

export interface Login extends Base {}
export interface Register extends Base {
  username: string;
}
