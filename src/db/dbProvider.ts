import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DATA_SOURCE } from './constants';
import { UserEntity } from '../entities/user/user.entity';
import { AlbumEntity } from '../entities/album/album.entity';
import { ArtistEntity } from '../entities/artists/artist.entity';
import { TrackEntity } from '../entities/track/track.entity';
import { FavoritesEntity } from '../entities/favorites/favorites.entity';

config();

export default {
  provide: DATA_SOURCE,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
      entities: [
        UserEntity,
        AlbumEntity,
        ArtistEntity,
        TrackEntity,
        FavoritesEntity,
      ],
      subscribers: [],
      migrations: [],
    });

    return dataSource.initialize();
  },
};
