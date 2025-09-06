import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';
import { UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepositoryMongo implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const created = new this.userModel({
      email: user.email,
      name: user.name,
      password: user.password,
    });
    const saved = await created.save();

    return new User(
      saved._id.toString(),
      saved.email,
      saved.name,
      saved.password,
      saved.createdAt,
      saved.updatedAt,
    );
  }

  async getByEmail(email: string): Promise<User | null> {
    const found = await this.userModel.findOne({ email }).exec();
    if (!found) return null;

    return new User(
      found._id.toString(),
      found.email,
      found.name,
      found.password,
      found.createdAt,
      found.updatedAt,
    );
  }

    async getById(id: string): Promise<User | null> {
    const found = await this.userModel.findOne({ _id:id }).exec();
    if (!found) return null;

    return new User(
      found._id.toString(),
      found.email,
      found.name,
      found.password,
      found.createdAt,
      found.updatedAt,
    );
  }
}
