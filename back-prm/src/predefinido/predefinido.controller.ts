import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import RoleGuard from 'src/auth/guard/roles.guard';
import { PredefinidoService } from './predefinido.service';
import { ProvinciasEntity, MunicipiosEntity } from './predefinido.entity';
import Role from 'src/auth/enum/roles.enum';



@Controller('predefinido')
export class PredefinidoController {

  constructor(private service: PredefinidoService) { }


  @Get('allProvincias')
  async getProvincias(){
    return await this.service.allP()
  }
  

  @Get('allMunicipios')
  async getMunicipios(){
    return await this.service.allM()
  }
      
  @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('allCandidaturas')
  async getCandidatura(){
    return await this.service.allC()
  }

  @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('allDist')
  async getDistritos(){
    return await this.service.allDist()
  }

  @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('allAbc')
  async getAbc(){
    return await this.service.zonasABC()
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('municipio/:id')
  async getMunicipio(@Param('id', ParseIntPipe) id: string){
    return await this.service.getM(id)
  }

  @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('provincia/:id')
  async getProvincia(@Param('id', ParseIntPipe) id: string){
    return await this.service.getP(id)
  }


  @Get('MunicipiosXProvincia/:id')
  async getOneMunicipios(@Param('id', ParseIntPipe) id: number){
    return await this.service.getMunicipiosXProvincia(id)
  }

  @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('DistritosXMunicipios/:id')
  async getDistritosXMunicipios(@Param('id', ParseIntPipe) id: string){
    return await this.service.getDistritosXMunicipios(id)
  }


// ZONAS

  //CREAR ZONAS
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('allZona')
   getZonas(){
   return  this.service.allZonas();
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Post('/addZona')
   async createUser(@Body() data: any){
  try {
   return await this.service.createZona(data);
  } catch (error) {
    return  error 
  }
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Get('readZona/:id')
  async getZona(@Param('id', ParseIntPipe) id: string){
    return await this.service.readZona(id)
  }

  @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Delete('/deleteZona/:id')
  delete(@Param('id', ParseIntPipe) id: string){
    try {
      return this.service.deleteZona(id);
    } catch (error) {
      console.log(error)
      return error
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.Admin || Role.User)) 
  @Patch('/updateZona/:id')
  async updates(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
  try {
  return  await this.service.updateZona(id, data);
  } catch (error) {
    return error
  }
}


///-----DISTRITOS----
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Post('/addDist')
async createDist(@Body() data: any){
try {
return await this.service.createDist(data)
} catch (error) {
 return  error 
}
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('readDist/:id')
async readDist(@Param('id', ParseIntPipe) id: string){
  return await this.service.readDist(id)
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Delete('/deleteDist/:id')
deleteDist(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.deleteDist(id);
  } catch (error) {
    return error
  }
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/updateDist/:id')
async updatesDist(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
try {
return  await this.service.updateDist(id, data);
} catch (error) {
  return error
}
}

///----COLEGIOS----
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('allColegio')
async getColegio(){
  return await this.service.allColegio()
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Post('/addColegio')
async createColegio(@Body() data: any){
try {
return await this.service.createColegio(data)
} catch (error) {
 return  error 
}
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('readColegio/:id')
async readColegio(@Param('id', ParseIntPipe) id: string){
  return await this.service.readColegio(id)
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Delete('/deleteColegio/:id')
deleteColegio(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.deleteColegio(id);
  } catch (error) {
    return error
  }
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/updateColegio/:id')
async updatesColegio(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
try {
return  await this.service.updateColegio(id, data);
} catch (error) {
  return error
}
}

//---RECINTOS
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('allRecinto')
async getRecintos(){
  return await this.service.allRecinto()
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Post('/addRecinto')
async createRecinto(@Body() data: any){
try {
return await this.service.createRecinto(data)
} catch (error) {
 return  error 
}
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('readRecinto/:id')
async readRecinto(@Param('id', ParseIntPipe) id: string){
  return await this.service.readRecinto(id)
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Delete('/deleteRecinto/:id')
deleteRecinto(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.deleteRecinto(id);
  } catch (error) {
    return error
  }
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/updateRecinto/:id')
async updatesRecinto(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
try {
return  await this.service.updateRecinto(id, data);
} catch (error) {
  return error
}
}

///-CIRCUNSCRIPCIONES
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('allCircuns')
async getCircuns(){
  return await this.service.allCircuns()
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Post('/addCircuns')
async createCircuns(@Body() data: any){
try {
return await this.service.createCircuns(data)
} catch (error) {

 return  error 
}
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('readCircuns/:id')
async readCircuns(@Param('id', ParseIntPipe) id: string){
  return await this.service.readCircuns(id)
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Delete('/deleteCircuns/:id')
deleteCircuns(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.deleteCircuns(id);
  } catch (error) {
    return error
  }
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/updateCircuns/:id')
async updatesCircuns(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
try {
return  await this.service.updateCircuns(id, data);
} catch (error) {
  return error
}
}


///-LOCALIDADES

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('allLocalidad')
 getLocalidad(){
  return this.service.allLocalidad()
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Post('/addLocalidad')
async createLocalidad(@Body() data: any){
try {
return await this.service.createLocalidad(data)
} catch (error) {
 return  error 
}
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Get('readLocalidad/:id')
async readLocalidad(@Param('id', ParseIntPipe) id: string){
  return await this.service.readLocalidad(id)
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Delete('/deleteLocalidad/:id')
deleteLocalidad(@Param('id', ParseIntPipe) id: string){
  try {
    return this.service.deleteLocalidad(id);
  } catch (error) {
    return error
  }
}
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@UseGuards(RoleGuard(Role.Admin || Role.User)) 
@Patch('/updateLocalidad/:id')
async updatesLocalidad(@Param('id', ParseIntPipe) id: string, @Body() data: any ){
try {
return  await this.service.updateLocalidad(id, data);
} catch (error) {
  return error
}
}


}
