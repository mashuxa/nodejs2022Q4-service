import { Artist } from '../interface/artist.interface';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDto implements Omit<Artist, 'id'> {
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  @IsNotEmpty()
  @IsString()
  name: string;
}
