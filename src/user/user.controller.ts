import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { jwtAuthGuard } from 'src/auth/jwt.guard';
import { Role } from 'src/auth/role-decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserDto } from './dto/user.dto';
import { Request } from 'express';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('/all-users')
  async getAllUser(){
    return await this.userService.getAllUsers();
  }

  @UseGuards(jwtAuthGuard,AuthGuard)
  //@Role('user')
  @Get("/me")
  get(@Req() req:Request) {
    // i divided the token into 2 partsss w then i took second part li houwa token
    //console.log(req.headers.authorization.split(' ')[1])
    return this.userService.getUserInfoFromToken(req.headers.authorization.split(' ')[1]);
  }
  @Post("/save-user")
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
  async saveUser(@Body() body: UserDto, @UploadedFiles() file: Express.Multer.File) {
     return  this.userService.saveUser(body,file[0].filename);
  }
  @UseGuards(jwtAuthGuard,AuthGuard)
  @Role('admin')
  @Delete("/delete-user/:id")
  async deleteUser(@Param('id') id:number){
    return await this.userService.deleteUser(id);
  }

}
