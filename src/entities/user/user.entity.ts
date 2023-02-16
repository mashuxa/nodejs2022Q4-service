import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
  VersionColumn,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserInterface } from './interface/user.interface';
import { Exclude } from 'class-transformer';

const transformer: ValueTransformer = {
  from: (value: string): number => new Date(value).getTime(),
  to: (value: string): string => value,
};

@Entity({ name: 'User' })
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn({ transformer })
  createdAt: number;

  @UpdateDateColumn({ transformer })
  updatedAt: number;

  @VersionColumn()
  version: number;

  constructor(dto: CreateUserDto) {
    Object.assign(this, dto);
  }
}
