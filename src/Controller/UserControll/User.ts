export class User {
  private id: number;
  private name: string;
  private email: string;
  private senha: string;


  constructor(id: number, name: string, email: string,senha: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  getId(): number {
    return this.id;
  }
  getSenha(): string {
    return this.senha;
  }
  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  setId(id: number): void {
    this.id = id;
  }

  setName(name: string): void {
    this.name = name;
  }
  setSenha(name: string): void {
    this.name = this.senha;
  }
  setEmail(email: string): void {
    this.email = email;
  }
}
