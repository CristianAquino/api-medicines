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
import { OrderDetail } from './order_details.entity';
import { Product } from './product.entity';

@Entity('orders')
@Check('quantity > 0')
@Check('total > 0')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int' })
  quantity: number;
  @Column({ type: 'float' }) //quantity*unit_price(product)
  total: number;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @ManyToOne(() => Product, (product) => product.orders)
  product: Relation<Product>;
  @ManyToOne(() => OrderDetail, (od) => od.orders)
  order_detail: Relation<Order>;
}
