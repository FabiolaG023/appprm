import { MunicipiosEntity, ProvinciasEntity, CircunscripcionesEntity, RecintosEntity, ColegiosEntity } from "src/predefinido/predefinido.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";


@Entity('coordmunicipales')
export class CoordMunicipalEntity {
    @PrimaryGeneratedColumn() id:string;

    @Column({length: 100})
    nombre: string;

    @Column({length: 20, unique: true})
    cedula: string;


    @Column({length: 100})
    apellido: string;


    @Column({length: 100})
    apodo: string;

    @Column({length: 100})
    telefono: string;

    @Column({type: 'text'})
    foto: string;

    @ManyToOne(()=> CircunscripcionesEntity)
    @JoinColumn({name: 'idcircunscripcion'})
    @Column({ type: 'int'})
    idcircunscripcion: CircunscripcionesEntity;

    @ManyToOne(()=> RecintosEntity)
    @JoinColumn({name: 'idrecinto'})
    @Column({ type: 'int'})
    idrecinto: RecintosEntity;


    @ManyToOne(()=> ColegiosEntity)
    @JoinColumn({name: 'idcolegio'})
    @Column({ type: 'int'})
    idcolegio: ColegiosEntity;


    @ManyToOne(()=> ProvinciasEntity)
    @JoinColumn({name: 'idprovincia'})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;




















}
