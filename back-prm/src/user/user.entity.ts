import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, OneToMany} from "typeorm";
import * as bcrypt from 'bcrypt'
import Role from "src/auth/enum/roles.enum";



@Entity('usuario')
export class UserEntity {
    @PrimaryGeneratedColumn() id: string;

    @Column({length: 100})
    nombre: string;

    @Column({length: 100})
    apellido: string;

    @Column({type: 'varchar', length: 70, unique: true})
    usuario: string;

    @Column({type: 'text'})
    foto: string;



    @Column({ type: 'varchar', length: 70, nullable: false })
    password: string;

    @BeforeInsert()
    async hashPass(){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    async validatePass(password: string): Promise<boolean>{
        return await bcrypt.compareSync(password, this.password)
    } 

    @Column({type: 'varchar', default: "user"})
    role!: Role;

   @Column({ type: 'int'})
    idprovincia: number;
    

    @Column({ type: 'int'})
    idmunicipio:number;


}
