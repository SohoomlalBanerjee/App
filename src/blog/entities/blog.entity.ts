import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog 
{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @Column()
    date:string

    // @Column()
    // completed:boolean

    //Many to 1
    @ManyToOne(()=>User,(user)=>user.blogs)
    user:User
}
