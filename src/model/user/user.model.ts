export interface User {
  email: string,
  firstName: string,
  lastName: string,
  picture?: string,
  password: string,
  role: string,
  lastActivity: Date
  visitors?: string[],
  doctors?: string[],
  medicines?: string[]
}
