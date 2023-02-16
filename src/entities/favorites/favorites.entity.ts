import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from '../track/track.entity';
import { AlbumEntity } from '../album/album.entity';
import { ArtistEntity } from '../artists/artist.entity';

@Entity({ name: 'Favorites' })
export class FavoritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => TrackEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  tracks: TrackEntity[];

  @ManyToMany(() => AlbumEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany(() => ArtistEntity, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinTable()
  artists: ArtistEntity[];
}
