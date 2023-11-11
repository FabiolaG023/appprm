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

   
    @Column({ type: 'varchar'})
    idcircunscripcion: string;

    @Column({ type: 'varchar'})
    iddistrito: string;


    @ManyToOne(()=> RecintosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idrecinto',referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-recintos"})
    idrecinto: RecintosEntity ;

    @Column({ type: 'varchar'})
    idcolegio: string;


    @ManyToOne(()=> ProvinciasEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia',referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-provincia"})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id', foreignKeyConstraintName: "coordMunicipal-municipio"})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;




















}
