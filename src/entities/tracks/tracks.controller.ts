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
import { CreateTrackDto } from './dto/create-track.dto';
import { NotFoundInterceptor } from '../../interceptors/NotFoundInterceptor';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TracksService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @UseInterceptors(NotFoundInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.findOne(id);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = new CreateTrackDto(createTrackDto);

    return await this.trackService.create(track);
  }

  @Put(':id')
  @UseInterceptors(NotFoundInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseInterceptors(NotFoundInterceptor)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.delete(id);
  }
}
