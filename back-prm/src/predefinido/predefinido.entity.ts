
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";

@Entity('provincias')
export class ProvinciasEntity {
    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar',length: 100})
    descripcion: string;

}

@Entity('municipios')
export class MunicipiosEntity {
    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar',length: 100})
    municipio: string;


    @ManyToOne(()=> ProvinciasEntity)
    @JoinColumn({name: 'idprovincia', referencedColumnName: 'id' })
    idprovincia: ProvinciasEntity;

}



@Entity('candidaturas')
export class CandidaturaEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar',length: 15})
    nombre: string;

}

@Entity('distritos')
export class DistritosEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'text'})
    distrito: string;

    
    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    idmunicipio: MunicipiosEntity;

}


@Entity('abc')
export class AbcsEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar'})
    letra: string;

  
}


@Entity('zonas')
export class ZonasEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar', unique: true})
    zona: string;

    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({type: 'int'})
    idmunicipio: MunicipiosEntity;
}



@Entity('recintos')
export class RecintosEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar'})
    recinto: string;

    @Column({type: 'varchar'})
    nombre: string;

  
}

@Entity('colegios')
export class ColegiosEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar'})
    colegio: string;

    @ManyToOne(()=> RecintosEntity)
    @JoinColumn({name: 'idrecinto'})
    @Column({type: 'int'})
    idrecinto: RecintosEntity;

  
}


@Entity('localidades')
export class LocalidadEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'varchar'})
    nombre: string;

    @ManyToOne(()=> ZonasEntity)
    @JoinColumn({name: 'idzona'})
    @Column({type: 'int'})
    idzona: ZonasEntity;

    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({type: 'int'})
    idmunicipio: MunicipiosEntity;
  
}

@Entity('circunscripciones')
export class CircunscripcionesEntity {

    @PrimaryGeneratedColumn() 
    id:string;

    @Column({type: 'text'})
    numero: string;

    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({type: 'int'})
    idmunicipio: MunicipiosEntity;
  
}