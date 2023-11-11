import { CoordMunicipalEntity } from "src/coordMunicipal/coordMunicipal.entity";
import { CircunscripcionesEntity, ColegiosEntity, LocalidadEntity, MunicipiosEntity, ProvinciasEntity, RecintosEntity, ZonasEntity } from "src/predefinido/predefinido.entity";

import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";



@Entity('coordzonales')
export class CoordZonaEntity {
    @PrimaryGeneratedColumn() id:string;

   @Column({length: 100})
    nombre: string;

    @Column({length: 100, unique: true})
    cedula: string;


    @Column({length: 100})
    apellido: string;


    @Column({length: 100})
    telefono: string;

    @Column({length: 100})
    apodo: string;

    @Column({type: 'text'})
    foto: string;

    @Column({ type: 'varchar'})
    idcircunscripcion: string;

    @Column({ type: 'varchar'})
    idrecinto: string;


    @Column({ type: 'varchar'})
    idcolegio: string;


    @Column({ type: 'varchar'})
    idlocalidad: string;


    @Column({ type: 'varchar', nullable: true})
    idzona: string;
  

    @ManyToOne(()=> CoordMunicipalEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcoordmunicipal', referencedColumnName: 'id', foreignKeyConstraintName: "coordZonales-coordmunicipal"})
    @Column({ type: 'int'})
    idcoordmunicipal: CoordMunicipalEntity;

 


    @ManyToOne(()=> ProvinciasEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia', referencedColumnName: 'id', foreignKeyConstraintName: "coordZonales-provincias"})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id',foreignKeyConstraintName: "coordZonales-municipio"})
    @Column({ type: 'int',nullable: true})
    idmunicipio: MunicipiosEntity;


   










}
