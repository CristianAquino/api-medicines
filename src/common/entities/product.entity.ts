import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
@Check('quantity >= 0')
@Check('unit_price > 0')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ type: 'varchar', length: 64 })
  name: string;
  @Column({ type: 'varchar' })
  sku: string;
  @Column({ type: 'float' })
  quantity: number;
  @Column({ type: 'boolean' })
  available: boolean;
  @Column({ type: 'float' })
  unit_price: number;
  @Column({ type: 'varchar', length: 64 })
  description: string;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @ManyToOne(() => Category, (category) => category.products)
  category: Relation<Category>;
}
