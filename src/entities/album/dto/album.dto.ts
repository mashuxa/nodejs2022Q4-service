import { Album } from '../interface/album.interface';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AlbumDto implements Omit<Album, 'id'> {
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;
}
