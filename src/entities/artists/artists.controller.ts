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
import { CreateArtistDto } from './dto/create-artist.dto';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DB } from '../../db/DB';

@Controller('artist')
export class ArtistController {
  constructor(private readonly db: DB) {}

  @Get()
  async findAll() {
    return this.db.artists.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.db.artists.findById(id);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.db.artists.create(new CreateArtistDto(createArtistDto));
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.db.artists.findById(id);

    if (!artist) return;

    return this.db.artists.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.db.artists.findById(id);

    if (!artist) return;

    this.db.artists.remove(id);

    const updatedTracks = this.db.tracks
      .findMany('artistId', id)
      .map((track) => ({ ...track, artistId: null }));
    const updatedAlbums = this.db.albums
      .findMany('artistId', id)
      .map((artist) => ({ ...artist, artistId: null }));

    this.db.tracks.updateMany(updatedTracks);
    this.db.albums.updateMany(updatedAlbums);
    this.db.favorites.artists.remove(id);

    return '';
  }
}
