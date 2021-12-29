import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class UserAuth {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({nullable:false})
    firstName: string

    @Column({nullable:false})
    lastName: string

    @Column({nullable:false})
    email: string

    @Column({nullable:false})
    phone: string

    @Column({nullable : false})
    password : string;


    @Column({nullable:false,type:'enum',enum:['USER','ADMIN'],default:'USER'})
    role?:'USER'|'ADMIN';

    @Column({ type: 'enum', enum: ['MALE', 'FEMALE', 'OTHER'], nullable: true })
    gender : 'MALE'|'FEMALE'|'OTHER';

    @Column({nullable : false})
    dOb : Date;

    // @BeforeInsert()
    // emailToLowerCase(){
    //     this.email = this.email.toLowerCase();
    // }

}
