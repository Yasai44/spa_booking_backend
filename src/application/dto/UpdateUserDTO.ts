export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string; // hashed if updated
  role?: "user" | "admin";
}
