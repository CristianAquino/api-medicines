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

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', default: null, nullable: true })
  full_names: string;
  @Column({ type: 'varchar', default: null, nullable: true })
  surnames: string;
  @Column({ type: 'varchar', length: 8, default: '00000000' })
  dni: string;
  //   date
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  //   relations
  @OneToOne(() => OrderDetail, (od) => od.customer)
  orders_details: Relation<OrderDetail>;
}
