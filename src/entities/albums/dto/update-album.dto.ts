import { Album } from '../interface/album.interface';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto implements Omit<Album, 'id'> {
  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsString()
  name: string;

  @IsInt()
  year: number;

  constructor(artist: Partial<UpdateAlbumDto>) {
    Object.assign(this, artist);
  }
}
