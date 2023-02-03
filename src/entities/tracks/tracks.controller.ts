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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-Track.dto';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { UpdateTrackDto } from './dto/update-Track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.findById(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(new CreateTrackDto(createTrackDto));
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = this.tracksService.findById(id);

    if (!track) return;

    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.tracksService.findById(id);

    if (!track) return;

    this.tracksService.remove(id);

    return '';
  }
}
