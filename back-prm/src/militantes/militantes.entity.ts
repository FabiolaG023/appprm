import { CoordComiteEntity } from "src/coordComite/coordComite.entity";
import { CoordMunicipalEntity } from "src/coordMunicipal/coordMunicipal.entity";
import { CircunscripcionesEntity, ColegiosEntity, DistritosEntity, LocalidadEntity, RecintosEntity, ZonasEntity } from "src/predefinido/predefinido.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";


@Entity('militantes')
export class MilitantesEntity {
    @PrimaryGeneratedColumn() id:string;


    @Column({type: 'varchar',length: 100})
    nombre: string;

    @Column({type: 'varchar',length: 100})
    cedula: string;


    @Column({type: 'varchar',length: 100})
    apellido: string;


    @Column({type: 'varchar',length: 100})
    telefono: string;

    @Column({type: 'varchar',length: 100})
    apodo: string;

    @Column({type: 'text'})
    foto: string;

    @ManyToOne(()=> DistritosEntity)
    @JoinColumn({name: 'iddistrito'})
    @Column({ type: 'int'})
    iddistrito: DistritosEntity;

    @ManyToOne(()=> CoordComiteEntity)
    @JoinColumn({name: 'idcoordcomite'})
    @Column({ type: 'int'})
    idcoordcomite: CoordComiteEntity;


    @ManyToOne(()=> ZonasEntity)
    @JoinColumn({name: 'idzona'})
    @Column({ type: 'int'})
    idzona: ZonasEntity;
   
/*     @ManyToOne(()=> RecintosEntity)
    @JoinColumn({name: 'idrecinto'})
    @Column({ type: 'int'})
    idrecinto: RecintosEntity; */
    @Column({type: 'varchar',length: 10})
    idrecinto: string;

    @Column({type: 'varchar',length: 10})
    idcircunscripcion: string;
 
   /* @ManyToOne(()=> CircunscripcionesEntity)
    @JoinColumn({name: 'idcircunscripcion'})
    @Column({ type: 'int'})
    idcircunscripcion: CircunscripcionesEntity;*/

/* 
    @ManyToOne(()=> ColegiosEntity)
    @JoinColumn({name: 'idcolegio'})
    @Column({ type: 'int'})
    idcolegio: ColegiosEntity; */
    
    @Column({type: 'varchar',length: 10})
    idcolegio: string;
     

    @ManyToOne(()=> LocalidadEntity)
    @JoinColumn({name: 'idlocalidad'})
    @Column({ type: 'int'})
    idlocalidad: LocalidadEntity;









}
