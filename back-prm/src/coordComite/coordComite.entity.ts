import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

import { CoordZonaEntity } from "src/coordZona/coordZona.entity";
import { ZonasEntity } from "src/predefinido/predefinido.entity";


@Entity('coordcomite')
export class CoordComiteEntity {
    @PrimaryGeneratedColumn() id:string;

    @Column({length: 100})
     nombre: string;
 
     @Column({length: 100})
     cedula: string;
 
     @Column({length: 100})
     apellido: string;
 
     @Column({length: 100})
     telefono: string;

     @Column({type: 'text'})
     foto: string
     
     @Column({length: 100})
     apodo: string;
 
     @ManyToOne(()=> ZonasEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
     @JoinColumn({name: 'idzona', referencedColumnName: 'id', foreignKeyConstraintName: "coordComite-zonas"})
     @Column({ type: 'int'})
     idzona: ZonasEntity;
   
     
 
     @ManyToOne(()=> CoordZonaEntity)
     @JoinColumn({name: 'idcoordzona', referencedColumnName: 'id', foreignKeyConstraintName: "coordComite-coordzonales"})
     @Column({ type: 'int'})
     idcoordzona: CoordZonaEntity;
 
 
 
 
 
}
