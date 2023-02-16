import { Artist } from '../interface/artist.interface';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto implements Omit<Artist, 'id'> {
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;

  constructor(artist: Partial<UpdateArtistDto>) {
    Object.assign(this, artist);
  }
}
