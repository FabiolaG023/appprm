import { CoordComiteEntity } from 'src/coordComite/coordComite.entity';
import { LocalidadEntity, MunicipiosEntity, ProvinciasEntity, ZonasEntity } from 'src/predefinido/predefinido.entity';
import { UserEntity } from 'src/user/user.entity';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Comite')
export class ComiteEntity {
    @PrimaryGeneratedColumn() id:string;

    
    @Column({type: 'datetime'})
    fecha: Date;

    
    @ManyToOne(()=> ProvinciasEntity)
    @JoinColumn({name: 'idprovincia'})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;

    
    @ManyToOne(()=> LocalidadEntity)
    @JoinColumn({name: 'idlocalidad'})
    @Column({ type: 'int'})
    idlocalidad: LocalidadEntity;


    @ManyToOne(()=> ZonasEntity)
    @JoinColumn({name: 'idzona'})
    @Column({ type: 'int'})
    idzona: ZonasEntity;


    
    @ManyToOne(()=> UserEntity)
    @JoinColumn({name: 'idusuario'})
    @Column({ type: 'int'})
    idusuario: UserEntity;


    @ManyToOne(()=> CoordComiteEntity)
    @JoinColumn({name: 'idcoorcomite'})
    @Column({ type: 'int'})
    idcoorcomite: CoordComiteEntity;

    
}
