import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { UserClaimDto } from './dto/Userclaims.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

 
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



}
