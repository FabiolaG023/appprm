import { CoordComiteEntity } from 'src/coordComite/coordComite.entity';
import { LocalidadEntity, MunicipiosEntity, ProvinciasEntity, ZonasEntity } from 'src/predefinido/predefinido.entity';
import { UserEntity } from 'src/user/user.entity';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comite')
export class ComiteEntity {
    @PrimaryGeneratedColumn() id:string;

    
    @Column({type: 'datetime'})
    fecha: Date;

    
    @ManyToOne(()=> ProvinciasEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia', referencedColumnName: 'id', foreignKeyConstraintName: "comite-provincia"})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id', foreignKeyConstraintName: "comite-municipio"})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;

    
    @ManyToOne(()=> LocalidadEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idlocalidad', referencedColumnName: 'id', foreignKeyConstraintName: "comite-localidad"})
    @Column({ type: 'int'})
    idlocalidad: LocalidadEntity;


    @ManyToOne(()=> ZonasEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idzona', referencedColumnName: 'id', foreignKeyConstraintName: "comite-zonas"})
    @Column({ type: 'int'})
    idzona: ZonasEntity;


    
    @ManyToOne(()=> UserEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idusuario', referencedColumnName: 'id', foreignKeyConstraintName: "comite-usuario"})
    @Column({ type: 'int'})
    idusuario: UserEntity;


    @ManyToOne(()=> CoordComiteEntity,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcoorcomite', referencedColumnName: 'id', foreignKeyConstraintName: "comite-coordcomite"})
    @Column({ type: 'int'})
    idcoorcomite: CoordComiteEntity;

    
}
