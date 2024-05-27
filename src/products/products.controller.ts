import { Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Role } from 'src/auth/role-decorator';
import { jwtAuthGuard } from 'src/auth/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("/all")
  //@UseGuards(jwtAuthGuard)
  //@Role('agent')
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get("/getproduct/:id")
  async getProductById( @Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Post("/save-product")
  @UseInterceptors(FilesInterceptor( 'file',10,
  {
    storage: diskStorage({
      destination: 'uploads',
      filename: (req, file, cb)=>{
        const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '')}`;
        cb(null, `${filename}`);
      }
    })
  }))
  async saveProduct(@Body() body: ProductDto, @UploadedFiles() file: Express.Multer.File) {
    return this.productsService.saveProduct(body,file[0].filename);
  }

  
}
