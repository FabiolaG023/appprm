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



    @ManyToOne(()=> CoordComiteEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcoordcomite', referencedColumnName: 'id', foreignKeyConstraintName: "militantes-coordComite"})
    @Column({ type: 'int'})
    idcoordcomite: CoordComiteEntity;


    @Column({ type: 'varchar', nullable: true})
    idzona: string;
   
  
    @Column({ type: 'varchar'})
    iddistrito: string;

    @Column({ type: 'varchar'})
    idlocalidad: string;


    @Column({ type: 'varchar'})
    idcircunscripcion: string;


    @Column({ type: 'varchar'})
    idrecinto: string;

    @Column({ type: 'varchar'})
    idcolegio: string;








}
