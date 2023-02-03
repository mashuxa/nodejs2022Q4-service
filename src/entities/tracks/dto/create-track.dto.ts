import { Track } from '../interface/Track.interface';
import { v4 as uuid } from 'uuid';
import { UpdateTrackDto } from './update-track.dto';

export class CreateTrackDto extends UpdateTrackDto implements Track {
  id: string;

  constructor(track: Partial<CreateTrackDto>) {
    super(track);

    this.id = uuid();
  }
}
