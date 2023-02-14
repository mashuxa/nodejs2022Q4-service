import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DATA_SOURCE } from './constants';
import { User } from './entities/users/user';
import { Album } from './entities/albums/album';
import { Artist } from './entities/artists/artist';
import { Track } from './entities/tracks/track';
import { Favorites } from './entities/favorites/favorites';

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
      entities: [User, Album, Artist, Track, Favorites],
      subscribers: [],
      migrations: [],
    });

    return dataSource.initialize();
  },
};
