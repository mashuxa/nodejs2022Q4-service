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
import { CreateAlbumDto } from './dto/create-album.dto';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DB } from '../../db/DB';

@Controller('album')
export class AlbumController {
  constructor(private readonly db: DB) {}

  @Get()
  async findAll() {
    return this.db.albums.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.db.albums.findById(id);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.db.albums.create(new CreateAlbumDto(createAlbumDto));
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.db.albums.findById(id);

    if (!album) return;

    return this.db.albums.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.db.albums.findById(id);

    if (!album) return;

    this.db.albums.remove(id);

    const updatedTracks = this.db.tracks
      .findMany('albumId', id)
      .map((artist) => ({ ...artist, albumId: null }));

    this.db.tracks.updateMany(updatedTracks);

    return '';
  }
}
