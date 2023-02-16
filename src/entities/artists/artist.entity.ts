import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist as ArtistInterface } from './interface/artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

@Entity({ name: 'Artist' })
export class ArtistEntity implements ArtistInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  constructor(dto: ArtistDto) {
    Object.assign(this, dto);
  }
}
