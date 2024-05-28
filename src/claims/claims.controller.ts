import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { UserClaimDto } from './dto/Userclaims.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StatusClaim } from './enums/StatusClaim.enum';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}


  @Get("/all-claims")
  async getAllClaims() {
    return this.claimsService.getAllClaims();
  }

  @Delete("/delete-claim/:id")
  async deleteClaim(@Param('id') idClaim:number){
    return this.claimsService.deleteClaim(idClaim);
  }
 
  @Post("/save-claim")
  @UseInterceptors(FilesInterceptor( 'file',10,
  {
    storage: diskStorage({
      destination: 'uploads',
      filename: (req, file, cb)=>{
        const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
        cb(null, `${filename}`);
      }
    })
  }
    
  ))
  async saveClaim(@Body() body: UserClaimDto, @UploadedFiles() file: Express.Multer.File) {

     return  this.claimsService.saveClaim(body,file[0].filename);
  }


  @Get("/all-user-claims/:id")
  async getAllUserClaims(@Param('id') id:number){
    return this.claimsService.getAllUserClaims(id);
  }
  @Patch("/update-state/:id")
  async updateState(@Param('id') id:number, @Body() body: {status: StatusClaim}){
    return this.claimsService.updateState(id, body.status);
  }



}
