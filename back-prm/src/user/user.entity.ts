import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import * as bcrypt from 'bcrypt'
import Role from "src/auth/enum/roles.enum";
import { MunicipiosEntity, ProvinciasEntity } from "src/predefinido/predefinido.entity";



@Entity('usuario')
export class UserEntity {
    @PrimaryGeneratedColumn() id: string;

    @Column({length: 100})
    nombre: string;

    @Column({length: 100})
    apellido: string;

    @Column({type: 'varchar', length: 70, unique: true})
    usuario: string;

    @Column({type: 'text', nullable: true})
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
    role!: string;

/* 
    @ManyToOne(()=> ProvinciasEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia',referencedColumnName: 'id', foreignKeyConstraintName: "usuario-provincia"})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id', foreignKeyConstraintName: "usuario-municipio"})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity; */



}
