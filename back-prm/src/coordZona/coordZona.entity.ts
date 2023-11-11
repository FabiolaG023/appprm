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

    @ManyToOne(()=> CircunscripcionesEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcircunscripcion', referencedColumnName: 'id', foreignKeyConstraintName: "coordZonales-circunscripcion"})
    @Column({ type: 'int'})
    idcircunscripcion: CircunscripcionesEntity;

    @ManyToOne(()=> RecintosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idrecinto', referencedColumnName: 'id',foreignKeyConstraintName: "coordZonales-recinto"})
    @Column({ type: 'int',nullable: true})
    idrecinto: RecintosEntity;


    @ManyToOne(()=> ColegiosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcolegio', referencedColumnName: 'id', foreignKeyConstraintName: "coordZonales-colegios"})
    @Column({ type: 'int'})
    idcolegio: ColegiosEntity;


    @ManyToOne(()=> ZonasEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idzona', referencedColumnName: 'id', foreignKeyConstraintName: "coordZonales-zonas"})
    @Column({ type: 'int'})
    idzona: ZonasEntity;
  

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


    @ManyToOne(()=> LocalidadEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idlocalidad', referencedColumnName: 'id', foreignKeyConstraintName: "coordZonales-localidad"})
    @Column({ type: 'int'})
    idlocalidad: LocalidadEntity;










}
