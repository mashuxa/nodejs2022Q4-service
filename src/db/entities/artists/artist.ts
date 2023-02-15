import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist as ArtistInterface } from '../../../entities/artists/interface/artist.interface';
import { ArtistDto } from '../../../entities/artists/dto/artist.dto';
import { Album } from '../albums/album';
import { Track } from '../tracks/track';

@Entity()
export class Artist implements ArtistInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  constructor(dto: ArtistDto) {
    Object.assign(this, dto);
  }
}
