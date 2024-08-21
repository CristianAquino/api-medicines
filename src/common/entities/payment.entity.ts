import { MethodPayment } from '@payment/infrastructure/controller/enum/payment.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from './order_details.entity';

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
  @OneToOne(() => OrderDetail, (od) => od.payment)
  orders_details: Relation<OrderDetail>;
}
