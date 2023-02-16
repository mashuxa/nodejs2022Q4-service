import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album as AlbumInterface } from './interface/album.interface';
import { AlbumDto } from './dto/album.dto';
import { ArtistEntity } from '../artists/artist.entity';
import { TrackEntity } from '../track/track.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'Album' })
export class AlbumEntity implements AlbumInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];

  constructor(dto: AlbumDto) {
    Object.assign(this, dto);
  }
}
