import { Entity ,Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import RealEstate from "./realEstate.entity";
import User from "./users.entity";

@Entity("schedules_users_properties")
class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "date"})
    date: string | Date;

    @Column({ type: "time"})
    hour: string;

    @ManyToOne(() => RealEstate)
    @JoinColumn()
    realEstate: RealEstate;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}

export default Schedule;
