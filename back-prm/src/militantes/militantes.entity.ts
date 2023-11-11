import { CoordComiteEntity } from "src/coordComite/coordComite.entity";
import { CoordMunicipalEntity } from "src/coordMunicipal/coordMunicipal.entity";
import { CircunscripcionesEntity, ColegiosEntity, DistritosEntity, LocalidadEntity, RecintosEntity, ZonasEntity } from "src/predefinido/predefinido.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";


@Entity('militantes')
export class MilitantesEntity {
    @PrimaryGeneratedColumn() id:string;


    @Column({type: 'varchar',length: 100})
    nombre: string;

    @Column({type: 'varchar',length: 100, unique: true})
    cedula: string;


    @Column({type: 'varchar',length: 100})
    apellido: string;


    @Column({type: 'varchar',length: 100})
    telefono: string;

    @Column({type: 'varchar',length: 100})
    apodo: string;

    @Column({type: 'text'})
    foto: string;

    @ManyToOne(()=> DistritosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'iddistrito',referencedColumnName: 'id', foreignKeyConstraintName: "militantes-distritos"})
    @Column({ type: 'int'})
    iddistrito: DistritosEntity;

    @ManyToOne(()=> CoordComiteEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcoordcomite', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-coordComite"})
    @Column({ type: 'int'})
    idcoordcomite: CoordComiteEntity;


    @ManyToOne(()=> ZonasEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idzona', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-zonas"})
    @Column({ type: 'int'})
    idzona: ZonasEntity;
   
    @ManyToOne(()=> RecintosEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idrecinto', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-recintos"})
    @Column({ type: 'int'})
    idrecinto: RecintosEntity; 


    @ManyToOne(()=> CircunscripcionesEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcircunscripcion', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-circunscripcion"})
    @Column({ type: 'int'})
    idcircunscripcion: CircunscripcionesEntity;


    @ManyToOne(()=> ColegiosEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcolegio', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-colegios"})
    @Column({ type: 'int'})
    idcolegio: ColegiosEntity; 
    

    @ManyToOne(()=> LocalidadEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idlocalidad', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-localidad"})
    @Column({ type: 'int'})
    idlocalidad: LocalidadEntity;









}
