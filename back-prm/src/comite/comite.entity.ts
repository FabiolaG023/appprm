import { CoordComiteEntity } from 'src/coordComite/coordComite.entity';
import { ConfigSystemEntity, LocalidadEntity, MunicipiosEntity, ProvinciasEntity, ZonasEntity } from 'src/predefinido/predefinido.entity';
import { UserEntity } from 'src/user/user.entity';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comite')
export class ComiteEntity {
    @PrimaryGeneratedColumn() id:string;

    
    @Column({type: 'datetime'})
    fecha: Date;

    
   /*  @ManyToOne(()=> ProvinciasEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia', referencedColumnName: 'id', foreignKeyConstraintName: "comite-provincia"})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id', foreignKeyConstraintName: "comite-municipio"})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;
 */

    @ManyToOne(()=> ConfigSystemEntity)
    @JoinColumn({name: 'config', referencedColumnName: 'id', foreignKeyConstraintName: "comite-config"})
    @Column({ type: 'int'})
    config: ConfigSystemEntity;
   

    @Column({type: 'varchar'})
    idlocalidad:string;


    @Column({type: 'varchar'})
    idzona: string;


/*     @Column({type: 'varchar'})
    idusuario: string; */


    @ManyToOne(()=> CoordComiteEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcoorcomite', referencedColumnName: 'id', foreignKeyConstraintName: "comite-coordcomite"})
    @Column({ type: 'int'})
    idcoorcomite: CoordComiteEntity;

    
}
