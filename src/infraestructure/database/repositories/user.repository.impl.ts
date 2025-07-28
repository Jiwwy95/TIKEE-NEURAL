import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';
import { UserMapper } from 'src/infraestructure/mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {
    super();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    const created = new this.userModel(UserMapper.toPersistence(user));
    const saved = await created.save();
    return UserMapper.toDomain(saved);
  }

  async updateModules(userId: string, modules: string[]): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { activeModules: modules },
      { new: true },
    );
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');
    return users.map(UserMapper.toDomain);
    }

  async updateUserRole(userId: string, newRole: string): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true },
    );
    return user ? UserMapper.toDomain(user) : null;
  }

  
  async updateUser(
    userId: string,
    data: Partial<{ name: string; email: string; role: string }>,
  ): Promise<User | null> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      data,
      { new: true },
    );
    return user ? UserMapper.toDomain(user) : null;
  }

 
  async deleteById(userId: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(userId);
    return !!result;
  }
}
