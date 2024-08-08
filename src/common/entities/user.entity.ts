import { Role } from '@user/infrastructure/controller/enum/user.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 32, unique: true })
  username: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'simple-enum', enum: Role, default: Role.USER })
  role: Role;
  // date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // realtions
}
