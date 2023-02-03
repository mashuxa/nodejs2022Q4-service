import { Artist } from '../interface/artist.interface';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateArtistDto implements Omit<Artist, 'id'> {
  @IsBoolean()
  grammy: boolean;

  @IsString()
  name: string;

  constructor(artist: Partial<UpdateArtistDto>) {
    Object.assign(this, artist);
  }
}
