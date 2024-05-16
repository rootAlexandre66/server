
// Importe a interface IUser do mesmo diretório da UserRepository
import { IUser } from '../interfaces/db.interface';
import { UserRepository } from '../interfaces/db.interface';

export class userRepository implements UserRepository {
  private users: IUser[] = [];

  async getById(id: string): Promise<IUser | null> {
    const user = this.users.find(u => u.name === id);
    return user || null;
  }


  async getAll(): Promise<IUser[]> {
    return this.users;
  }

  async save(user: IUser): Promise<void> {
    this.users.push(user);
  }

  async update(updatedUser: IUser): Promise<void> {
    const index = this.users.findIndex(u => u.name === updatedUser.name);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.name !== id);
  }
}

export default userRepository;
