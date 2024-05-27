import { Body, Controller, Post } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { UserClaimDto } from './dto/Userclaims.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post("report")
  async create(@Body() createClaimDto: UserClaimDto) {
    return this.claimsService.saveClaim(createClaimDto);
  }





}
