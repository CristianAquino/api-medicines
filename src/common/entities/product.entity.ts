import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Order } from './order.entity';

@Entity('products')
@Check('quantity >= 0')
@Check('unit_price > 0')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 64 })
  name: string;
  @Column({ type: 'varchar' })
  sku: string;
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'boolean' })
  available: boolean;
  @Column({ type: 'float' })
  unit_price: number;
  @Column({ type: 'date' })
  expiration_date: Date;
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
  @OneToMany(() => Order, (order) => order.product)
  orders: Relation<Order>[];
}
