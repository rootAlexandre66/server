export interface UserRepository {
  getById(id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  save(user: IUser): Promise<void>;
  update(user: IUser): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IUser {
  email: string;
  name: string;
  cpf: string;
  senha: string;
  update_at?: Date;
  pedidos?: string[]; // ou o tipo adequado para pedidos
  adress?: string; // ou o tipo adequado para endereço
  secretKey?: string;
  token?: string;
}

export interface IUserModel extends IUser, Document {
  create_at?: Date; // Adicione esta linha
}
