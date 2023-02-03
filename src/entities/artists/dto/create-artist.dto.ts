import { Artist } from '../interface/artist.interface';
import { v4 as uuid } from 'uuid';
import { UpdateArtistDto } from './update-artist.dto';

export class CreateArtistDto extends UpdateArtistDto implements Artist {
  id: string;

  constructor(artist: Partial<CreateArtistDto>) {
    super(artist);

    this.id = uuid();
  }
}
