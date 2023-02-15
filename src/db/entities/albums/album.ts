import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album as AlbumInterface } from '../../../entities/albums/interface/album.interface';
import { AlbumDto } from '../../../entities/albums/dto/album.dto';
import { Artist } from '../artists/artist';
import { Track } from '../tracks/track';
import { IsOptional } from 'class-validator';

@Entity()
export class Album implements AlbumInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @IsOptional()
  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  constructor(dto: AlbumDto) {
    Object.assign(this, dto);
  }
}
