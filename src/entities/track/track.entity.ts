import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../artists/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { Track as TrackInterface } from './interface/track.interface';
import { TrackDto } from './dto/track.dto';
import { IsOptional } from 'class-validator';

@Entity({ name: 'Track' })
export class TrackEntity implements TrackInterface {
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

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;

  constructor(dto: TrackDto) {
    Object.assign(this, dto);
  }
}
