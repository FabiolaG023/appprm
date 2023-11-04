import { CoordMunicipalEntity } from "src/coordMunicipal/coordMunicipal.entity";
import { CircunscripcionesEntity, ColegiosEntity, MunicipiosEntity, ProvinciasEntity, RecintosEntity, ZonasEntity } from "src/predefinido/predefinido.entity";

import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";



@Entity('coordzonales')
export class CoordZonaEntity {
    @PrimaryGeneratedColumn() id:string;

   @Column({length: 100})
    nombre: string;

    @Column({length: 100})
    cedula: string;


    @Column({length: 100})
    apellido: string;


    @Column({length: 100})
    telefono: string;

    @Column({length: 100})
    apodo: string;

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



    @ManyToOne(()=> ZonasEntity)
    @JoinColumn({name: 'idzona', referencedColumnName: 'id'})
    @Column({ type: 'int'})
    idzona: ZonasEntity;
  

    @ManyToOne(()=> CoordMunicipalEntity)
    @JoinColumn({name: 'idcoordmunicipal'})
    @Column({ type: 'int'})
    idcoordmunicipal: CoordMunicipalEntity;



    @ManyToOne(()=> ProvinciasEntity)
    @JoinColumn({name: 'idprovincia'})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;










}
