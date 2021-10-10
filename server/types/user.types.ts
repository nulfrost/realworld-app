interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  password: string;
}

export interface Login {
  user: Omit<User, "token" | "username" | "bio" | "image">;
}

export interface Register {
  user: Omit<User, "token" | "bio" | "image">;
}
