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
import { CreateTrackDto } from './dto/create-Track.dto';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { UpdateTrackDto } from './dto/update-Track.dto';
import { DB } from '../../db/DB';

@Controller('track')
export class TrackController {
  constructor(private readonly db: DB) {}

  @Get()
  async findAll() {
    return this.db.tracks.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.db.tracks.findById(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.db.tracks.create(new CreateTrackDto(createTrackDto));
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.db.tracks.findById(id);

    if (!track) return;

    return this.db.tracks.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.db.tracks.findById(id);

    if (!track) return;

    this.db.tracks.remove(id);

    return '';
  }
}
