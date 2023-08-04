import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ShowDto } from '../dto/show.dto';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(private showsService: ShowsService) {}

  @UseGuards(AuthGuard)
  @Post()
  createShow(
    @Req() req: Request,
    @Body() show: ShowDto,
  ): Promise<{ message: string }> {
    const { userId, isAdmin } = req['user'];
    return this.showsService.createShow(userId, isAdmin, show);
  }

  @Get()
  getAll() {
    return this.showsService.getAll();
  }

  @Get('search')
  getByTitle(@Query('title') title: string): Promise<ShowDto[] | ShowDto> {
    return this.showsService.getByTitle(title);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.showsService.getDetail(id);
  }
}
