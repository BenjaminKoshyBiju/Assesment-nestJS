import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()       //generate id for the table.
    id: number;

    @Column({type:'varchar', length: 30})
    name:string;

    @Column({ type:'varchar', length:20})
    username:string;

    @Column({type:'varchar', length:25})
    email:string;

    @Column({type:'int'})
    age:number

    @Column({ type: 'varchar' })
    password: string;

    @Column({type:'enum', enum:['m','f','u']})
    gender: String
}

