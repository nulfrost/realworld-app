type User = {
  email: string;
  token: string;
  username: string;
  password: string;
};

export type Login = {
  user: Omit<User, 'token' | 'username'>;
};

export type Register = {
  user: Omit<User, 'token'>;
};
