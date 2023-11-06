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

    @Column({length: 100, nullable: true})
    telefono: string;

    @Column({type: 'text'})
    foto: string;

    @ManyToOne(()=> CircunscripcionesEntity, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcircunscripcion', referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-circunscripcion"})
    @Column({ type: 'int', nullable: true})
    idcircunscripcion: CircunscripcionesEntity;

    @ManyToOne(()=> RecintosEntity, { onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idrecinto', referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-recinto"})
    @Column({ type: 'int', nullable: true})
    idrecinto: RecintosEntity;


    @ManyToOne(()=> ColegiosEntity, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcolegio',referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-colegio"})
    @Column({ type: 'int', nullable: true})
    idcolegio: ColegiosEntity;


    @ManyToOne(()=> ProvinciasEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia',referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-provincia"})
    @Column({ type: 'int', nullable: true})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-municipio"})
    @Column({ type: 'int', nullable: true})
    idmunicipio: MunicipiosEntity;




















}
