import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from './order_details.entity';
import { Product } from './product.entity';

@Entity('orders')
@Check('quantity > 0')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  quantity: number;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @ManyToOne(() => OrderDetail, (od) => od.orders)
  order: Relation<Order>;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Relation<Product>[];
  @ManyToOne(() => OrderDetail, (od) => od.orders)
  order_detail: Relation<Order>;
}
