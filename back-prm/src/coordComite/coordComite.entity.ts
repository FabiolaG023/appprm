import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

import { CoordZonaEntity } from "src/coordZona/coordZona.entity";
import { ConfigSystemEntity, ZonasEntity } from "src/predefinido/predefinido.entity";


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
 
   /*   @ManyToOne(()=> ZonasEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
     @JoinColumn({name: 'idzona', referencedColumnName: 'id', foreignKeyConstraintName: "coordComite-zonas"})
     @Column({ type: 'int'})
     idzona: ZonasEntity; */

     @ManyToOne(()=> ConfigSystemEntity)
     @JoinColumn({name: 'config', referencedColumnName: 'id', foreignKeyConstraintName: "coordcomite-config"})
     @Column({ type: 'int'})
     config: ConfigSystemEntity; 

    
     @Column({ type: 'varchar'})
     idzona: string;
   
     
 
     @ManyToOne(()=> CoordZonaEntity)
     @JoinColumn({name: 'idcoordzona', referencedColumnName: 'id', foreignKeyConstraintName: "coordComite-coordzonales"})
     @Column({ type: 'int'})
     idcoordzona: CoordZonaEntity;
 
 
 
 
 
}
