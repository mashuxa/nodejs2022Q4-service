import { Track } from '../interface/Track.interface';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto implements Omit<Track, 'id'> {
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(track: Partial<UpdateTrackDto>) {
    Object.assign(this, track);
  }
}
