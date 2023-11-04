import { CandidaturaEntity, MunicipiosEntity, ProvinciasEntity } from "src/predefinido/predefinido.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

@Entity('lider')
export class LiderEntity {

   @PrimaryGeneratedColumn() id:string;

    @Column({length: 100})
    nombre: string;


    @Column({type: 'text'})
    foto: string;

    @ManyToOne(()=> ProvinciasEntity)
    @JoinColumn({name: 'idprovincia'})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity)
    @JoinColumn({name: 'idmunicipio'})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;

    @ManyToOne(()=> CandidaturaEntity)
    @JoinColumn({name: 'idcandidatura'})
    @Column({ type: 'int'})
    idcandidatura: CandidaturaEntity;



}
