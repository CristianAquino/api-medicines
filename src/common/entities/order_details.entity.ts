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
import { Customer } from './customer.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';

@Entity('orders_details')
@Check(`"total" > 0`)
@Check(`"tax" >= 0`)
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float' })
  total: number;
  @Column({ type: 'float' })
  tax: number;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @OneToMany(() => Order, (order) => order.order_detail)
  orders: Relation<Order>[];
  @ManyToOne(() => Customer, (customer) => customer.orders_details)
  customer: Relation<Customer>;
  @ManyToOne(() => Payment, (payment) => payment.orders_details)
  payment: Relation<Payment>;
}
