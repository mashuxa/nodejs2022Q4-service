import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Album as AlbumInterface } from '../../../entities/albums/interface/album.interface';

@Entity()
export class Album implements AlbumInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artistId: string | null;

  @Column()
  name: string;

  @Column()
  year: number;
}
