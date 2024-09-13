import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Order } from './order.entity';
import { Payment } from './payment.entity';

@Entity('orders_details')
@Check('total_amount > 0')
@Check('sub_total > 0')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'float', precision: 2 })
  total_amount: number;
  @Column({ type: 'float', precision: 2 })
  sub_total: number;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @OneToMany(() => Order, (order) => order.order_detail)
  orders: Relation<Order>[];
  @OneToOne(() => Customer, (customer) => customer.orders_details)
  @JoinColumn()
  customer: Relation<Customer>;
  @OneToOne(() => Payment, (payment) => payment.orders_details)
  @JoinColumn()
  payment: Relation<Payment>;
}
