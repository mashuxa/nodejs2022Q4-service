import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist as ArtistInterface } from '../../../entities/artists/interface/artist.interface';

@Entity()
export class Artist implements ArtistInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
