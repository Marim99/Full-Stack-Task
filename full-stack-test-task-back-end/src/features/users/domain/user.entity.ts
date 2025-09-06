export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string, 
    public password: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}