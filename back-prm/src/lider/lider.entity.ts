import { CandidaturaEntity, MunicipiosEntity, ProvinciasEntity } from "src/predefinido/predefinido.entity";
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";

@Entity('lider')
export class LiderEntity {

   @PrimaryGeneratedColumn() id:string;

    @Column({length: 100, unique: true})
    nombre: string;

    @Column({type: 'text'})
    foto: string;

    @ManyToOne(()=> ProvinciasEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idprovincia', referencedColumnName: 'id', foreignKeyConstraintName: "lider-provincia"})
    @Column({ type: 'int'})
    idprovincia: ProvinciasEntity;


    @ManyToOne(()=> MunicipiosEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idmunicipio', referencedColumnName: 'id', foreignKeyConstraintName: "lider-municipio"})
    @Column({ type: 'int'})
    idmunicipio: MunicipiosEntity;

    @ManyToOne(()=> CandidaturaEntity, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'idcandidatura', referencedColumnName: 'id', foreignKeyConstraintName: "lider-candidatura"})
    @Column({ type: 'int'})
    idcandidatura: CandidaturaEntity;
}
