import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artist';
import { Album } from '../albums/album';
import { Track as TrackInterface } from '../../../entities/tracks/interface/track.interface';
import { TrackDto } from '../../../entities/tracks/dto/track.dto';
import { IsOptional } from 'class-validator';

@Entity()
export class Track implements TrackInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string | null;

  @IsOptional()
  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: Album;

  constructor(dto: TrackDto) {
    Object.assign(this, dto);
  }
}
