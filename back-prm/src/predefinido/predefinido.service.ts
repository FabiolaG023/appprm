
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProvinciasEntity, MunicipiosEntity, CandidaturaEntity, DistritosEntity, AbcsEntity,  ZonasEntity, ColegiosEntity, RecintosEntity, CircunscripcionesEntity, LocalidadEntity, ConfigSystemEntity } from './predefinido.entity';
import { Repository, createQueryBuilder } from 'typeorm';


@Injectable()
export class PredefinidoService {

    constructor(


        @InjectRepository(ProvinciasEntity)
        private readonly provincias: Repository<ProvinciasEntity>,

        @InjectRepository(MunicipiosEntity)
        private readonly municipios: Repository<MunicipiosEntity>,

        @InjectRepository(CandidaturaEntity)
        private readonly candidaturas: Repository<CandidaturaEntity>,

        
        @InjectRepository(DistritosEntity)
        private readonly distritos: Repository<DistritosEntity>,
        

        @InjectRepository(AbcsEntity)
        private readonly abc: Repository<AbcsEntity>,

         @InjectRepository(ZonasEntity)
         private readonly  zona: Repository<ZonasEntity>,

         @InjectRepository(ColegiosEntity)
         private readonly  colegio: Repository<ColegiosEntity>,

         @InjectRepository(RecintosEntity)
         private readonly  recinto: Repository<RecintosEntity>,

         @InjectRepository(CircunscripcionesEntity)
         private readonly  circuns: Repository<CircunscripcionesEntity>,

         @InjectRepository(LocalidadEntity)
         private readonly  localidad: Repository<LocalidadEntity>,
         
         @InjectRepository(ConfigSystemEntity)
         private readonly respoConfig: Repository<ConfigSystemEntity>,

        ) {}


        async configAdd(data: any){
          const conf = await this.respoConfig.find()
          try {
              if (!conf) {
                  const newConfig = this.respoConfig.create(data)
                  return this.respoConfig.save(newConfig) 
              }
          } catch (error) {
              throw error
          }
          
          }
          
          async configread(id: any){
              const conf = await this.respoConfig.findOne({where: {id}})
              try {
                  if (!conf) {
                      return new HttpException('Configuracion no encontrada', HttpStatus.NOT_FOUND)
                  }else{ return conf}
              } catch (error) {
                  throw error 
              }
              }
          









        // BUSCA TODAS LAS PROVINCIAS
        async allP(){
            try {
              return await this.provincias.find() 
            } catch (error) {
              return error  
            }
        }

        // BUSCA TODOS LOS MUNICIPIOS
        async allM(){
            try {
            return await this.municipios.find()  
         
            } catch (error) {
              return error  
            }
        }
      // BUSCA TODAS LAS CANDIDATURAS
        async allC(){
          try {
            return await this.candidaturas.find()  
          } catch (error) {
            return error  
          }
      }


          //BUSCA UN MUNICIPIO
          async getM(id: any){
            const municipioFound = await this.municipios.findOne({where: {id: id}})
            try {
              if(!municipioFound){}else{return municipioFound}

          } catch (error) {
             
              throw error
          }
    
          }

          // BUSCA UNA PROVINCIA
          async getP(id: any){
            const provinciaFound = await this.provincias.findOne({where: {id: id}})
            try {
              if(!provinciaFound){
                return new HttpException('User no encontrado', HttpStatus.NOT_FOUND)
              }else{return provinciaFound}
     
          } catch (error) {
              
              throw error
          }
    
          }
// BUSCAR ERROR QUE HACE QUE SE BORREN LOS DATOS DE LA BASE DATOS


       // BUSCA TODAS LAS PROVINCIAS X MUNICIPIOS CON JOIN
       async getMunicipiosXProvincia(id: any){
         const provincia =   await this.provincias.findOneBy({id})

         if (!provincia) {
          // Manejo de error si la provincia no se encuentra
          throw new Error('Provincia no encontrada');
        }
     /*      const result = this.municipios
          .createQueryBuilder('municipios')
          .leftJoinAndSelect('municipios.idprovincia', 'provincias')
          .where('municipios.idprovincia = :id', { id: provincia.id})
         .getMany(); */

         const result = await this.municipios
         .createQueryBuilder('municipios')
         .leftJoinAndSelect('municipios.idprovincia', 'provincias') // Cambiado a 'provincia' en lugar de 'idprovincia'
         .where('municipios.idprovincia = :id', { id: provincia.id }) // Cambiado a 'provincia' en lugar de 'idprovincia'
         .getMany();
     
         
         return result
        }

    

        // BUSCA TODAS LAS DISTRITOS x Municipios
    


      /// ---------ZONAS----------

      // BUSCA TODAS LAS ZONAS ABC
      async zonasABC(){
        try {
          return await this.abc.find()  
        } catch (error) {
          console.log(error)
          return error  
        }
    }

    // ZONAS REGISTRADAS
   async  allZonas(){
      try {
        let found = await  this.zona.find()
        return  found
      } catch (error) {
        console.log(error)
        return error  
      }
    }


    // AGREGAR ZONAS
    async createZona(data:any){
      const zonaFound = await  this.zona.findOne({where:{zona: data.zona}})
    //  console.log(data)
     // console.log(zonaFound)
        try {
  
            if(zonaFound|| zonaFound == data.zona){
             console.log(`no es posible REGISTRAR esta Zona:${zonaFound.zona}, porque existe`)
            }else{
              if (zonaFound == null) {
                
                const newZona = this.zona.create(data)
                return this.zona.save(newZona)
              }
            
            }
         
        } catch (error) {
          console.log(error)
          return error
        }
     }
    // LEER ZONAS
     async readZona(id: string){
      const coordZonaFound = await this.zona.findOne({where:{id}})
  
          try {
              if(!coordZonaFound){
              return new HttpException('coordZona no encontrado', HttpStatus.NOT_FOUND)
              }else{ return coordZonaFound}
              
  
          } catch (error) {
            console.log(error)
              throw error
          }
  
          
          } 
    // ELEMINIAR ZONAS
    async deleteZona(id: string){
      const found = await this.zona.findOne({where:{id}})
          try {
              if (found) {
              return this.zona.delete(id)
              } else {
                  return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
              }
              
          } catch (error) {
            console.log(error)
              throw error
          }
      
      }
    //ACTUALIZAR ZONAS
    async updateZona(id: string, data: any){
        const found = await this.zona.findOne({where:{id}})
            try {
            if (!found) {
                return new HttpException('encontrado', HttpStatus.NOT_FOUND)
                }else{
                const dataUpdate = Object.assign(found, data);
                return this.zona.save(dataUpdate);
                }
            
        } catch (error) {
          console.log(error)
            throw error
        } 
             }

  //----------LOCALIDADES----------
    
     async allLocalidad(){
      try {
        let found = await this.localidad.find({relations: { idzona: true}})  
        return found
      } catch (error) {
        console.log(error)
        return error  
      }
    }
    async createLocalidad(data:any){
      const found = await this.localidad.findOne({where:{nombre: data.nombre}})
      console.log(data)
        try {
          if (found || found == data.nombre) {
            console.log(`no es posible REGISTRAR esta Localidad, porque existe`)

          }else{
            if(found == null){
              const newLocalidad = this.localidad.create(data)
              return await this.localidad.save(newLocalidad)
            }
          }
        } catch (error) {
          console.log(error)
          return error 
        }
      }
    async readLocalidad(id: string){
    const found = await this.localidad.findOne({
        where:{id}, 
        relations:{ idzona: true}})
      try {
          if(!found){
          return new HttpException(' no encontrado', HttpStatus.NOT_FOUND)
          }else{ return found}
      } catch (error) {
          throw error
      }
      } 
    async deleteLocalidad(id: string){
      const found = await this.localidad.findOne({where:{id}})
          try {
              if (found) {
              return this.localidad.delete(id)
              } else {
                  return new HttpException('encontrado', HttpStatus.NOT_FOUND)
              }
              
          } catch (error) {
            console.log(error)
              throw error
          }
      
      }
    async updateLocalidad(id: string, data: any){
      const found = await this.localidad.findOne({where:{id}})
          try {
          if (!found) {
              return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
              }else{
              const dataUpdate = Object.assign(found, data);
              return this.localidad.save(dataUpdate);
              }
      } catch (error) {
        console.log(error)
          throw error
      } 
      }
  

    //------RECINTOS---

    async allRecinto(){
      try {
        return await this.recinto.find()  
      } catch (error) {
        console.log(error)
        return error  
      }
    }
    async createRecinto(data:any){
      const found = await this.recinto.findOne({where:{recinto: data.recinto}})
        try {
          if (!found) {
            const dataRecinto = this.recinto.create(data)
            return await this.recinto.save(dataRecinto)
          }
        } catch (error) {
          console.log(error)
          return error 
        }
      }
    async readRecinto(id: string){
    const found = await this.recinto.findOne({where:{id}})
      try {
          if(!found){
          return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
          }else{ return found}
      } catch (error) {
        console.log(error)
          throw error
      }
      } 
       async readRecintoName(recinto: any){
        const found = await this.recinto.findOneBy(recinto)
        try {
          if (found) {
            return found
          }
        } catch (error) {
          return error
        }
       }

    async deleteRecinto(id: string){
      const found = await this.recinto.findOne({where:{id}})
          try {
              if (found) {
              return this.recinto.delete(id)
              } else {
                  return new HttpException('encontrado', HttpStatus.NOT_FOUND)
              }
              
          } catch (error) {
            console.log(error)
              throw error
          }
      
      }
    async updateRecinto(id: string, data: any){
      const found = await this.recinto.findOne({where:{id}})
          try {
          if (!found) {
              return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
              }else{
              const dataUpdate = Object.assign(found, data);
              return this.recinto.save(dataUpdate);
              }
      } catch (error) {
        console.log(error)
          throw error
      } 
      }

    //----CIRCUNSCRIPCIONES
    async allCircuns(){
      try {
        return await this.circuns.find()  
      } catch (error) {
        console.log(error)
        return error  
      }
    }
    async createCircuns(data:any){
      const found = await this.circuns.findOne({where:{ numero: data.numero}})
      try {
          if (!found) {
            const newData = this.circuns.create(data)
            return await this.circuns.save(newData)
          }
        } catch (error) {
          console.log(error)
          return error 
        }
      }
    async readCircuns(id: string){
    const found = await this.circuns.findOne({
        where:{id}})
      try {
          if(!found){
          return new HttpException(' no encontrado', HttpStatus.NOT_FOUND)
          }else{ return found}
      } catch (error) {
        console.log(error)
          throw error
      }
      } 
    async deleteCircuns(id: string){
      const found = await this.circuns.findOne({where:{id}})
          try {
              if (found) {
              return this.circuns.delete(id)
              } else {
                  return new HttpException('encontrado', HttpStatus.NOT_FOUND)
              }
              
          } catch (error) {
            console.log(error)
              throw error
          }
      
      }
    async updateCircuns(id: string, data: any){
      const found = await this.circuns.findOne({where:{id}})
          try {
          if (!found) {
              return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
              }else{
              const dataUpdate = Object.assign(found, data);
              return this.circuns.save(dataUpdate);
              }
      } catch (error) {
        console.log(error)
          throw error
      } 
      }

//-----COLEGIOS

  async allColegio(){
    try {
      return await this.colegio.find({relations: {idrecinto: true}})  
    } catch (error) {
      console.log(error)
      return error  
    }
  }
  async createColegio(data:any){
    const found = await this.colegio.findOne({where:{colegio: data.colegio}})
      try {
        if (!found) {
          const coordMuni = this.colegio.create(data)
          return await this.colegio.save(coordMuni)
        }
      } catch (error) {
        console.log(error)
        return error 
      }
    }
  async readColegio(id: string){
  const found = await this.colegio.findOne({
      where:{id}, 
      relations:{idrecinto: true,}})
    try {
        if(!found){
        return new HttpException(' no encontrado', HttpStatus.NOT_FOUND)
        }else{ return found}
    } catch (error) {
      console.log(error)
        throw error
        
    }
    } 
  async deleteColegio(id: string){
    const found = await this.colegio.findOne({where:{id}})
        try {
            if (found) {
            return await this.colegio.delete(id)
            } else {
                return new HttpException('encontrado', HttpStatus.NOT_FOUND)
            }
            
        } catch (error) {
          console.log(error)
            throw error
        }
    
    }
  async updateColegio(id: string, data: any){
    const found = await this.colegio.findOne({where:{id}})
        try {
        if (!found) {
            return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
            }else{
            const dataUpdate = Object.assign(found, data);
            return this.colegio.save(dataUpdate);
            }
    } catch (error) {
      console.log(error)
        throw error
    } 
    }

///----DISTRITOS

    async allDist(){
          try {
            return await this.distritos.find()
          } catch (error) {
            console.log(error)
            return error  
          }
      }
    async createDist(data:any){
      const found = await  this.distritos.findOne({where:{distrito : data.distrito }})
        try {
              if (found == null) {
                const newdistrito  = this.distritos.create(data)
                return this.distritos.save(newdistrito )
              }
        } catch (error) {
          console.log(error)
          return error
        }
     }
   async readDist(id: string){
      const found = await this.distritos.findOne({where:{id}})
          try {
              if(!found){
              return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
              }else{ return found}
          } catch (error) {
            console.log(error)
              throw error
          }
  
          
          } 
    async deleteDist(id: string){
      const found = await this.distritos.findOne({where:{id}})
          try {
              if (found) {
              return this.distritos.delete(id)
              } else {
                  return new HttpException('no encontrado', HttpStatus.NOT_FOUND)
              }
              
          } catch (error) {
            console.log(error)
              throw error
          }
      
      }
    async updateDist(id: string, data: any){
        const found = await this.distritos.findOne({where:{id}})
            try {
            if (!found) {
                return new HttpException('encontrado', HttpStatus.NOT_FOUND)
                }else{
                const dataUpdate = Object.assign(found, data);
                return this.distritos.save(dataUpdate);
                }
            
        } catch (error) {
          console.log(error)
            throw error
        } 
             }
        
}
