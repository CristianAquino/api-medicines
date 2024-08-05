import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from './order_details.entity';

enum MethodPayment {
  CASH = 'cash',
  CARD = 'card',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'simple-enum',
    enum: MethodPayment,
    default: MethodPayment.CASH,
  })
  type: MethodPayment;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @OneToMany(() => OrderDetail, (od) => od.payment)
  orders_details: Relation<OrderDetail>[];
}
