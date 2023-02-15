import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Track as TrackInterface } from '../../../entities/tracks/interface/track.interface';

@Entity()
export class Track implements TrackInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;
}
