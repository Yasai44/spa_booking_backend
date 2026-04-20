export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string; 
  role?: "user" | "admin";
}
