import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { ArtistDto } from './dto/artist.dto';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistsService: ArtistService) {}

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistsService.findOne(id);
  }

  @Post()
  async create(@Body() createArtistDto: ArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: ArtistDto,
  ) {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistsService.delete(id);
  }
}
