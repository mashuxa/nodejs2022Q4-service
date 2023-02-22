import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user/user.entity';
import { AlbumEntity } from '../entities/album/album.entity';
import { ArtistEntity } from '../entities/artists/artist.entity';
import { TrackEntity } from '../entities/track/track.entity';
import { FavoritesEntity } from '../entities/favorites/favorites.entity';
import { config } from 'dotenv';
import { InitialMigration1676673218693 } from './migrations/InitialMigration1676673218693';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    UserEntity,
    AlbumEntity,
    ArtistEntity,
    TrackEntity,
    FavoritesEntity,
  ],
  migrations: [InitialMigration1676673218693],
  migrationsRun: true,
});

export default dataSource;
