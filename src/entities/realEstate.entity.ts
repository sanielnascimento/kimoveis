import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Address from "./addresses.entity";
import Category from "./categories.entity";
import Schedule from "./schedules.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number | string;

  @Column()
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (category) => category.realEstate)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[];
}

export default RealEstate;
