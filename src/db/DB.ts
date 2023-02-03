import { DBInterface } from './db.interface';
import { DBEntity } from './entities/DBEntity';
import { User } from '../entities/users/interface/user.interface';
import { Track } from '../entities/tracks/interface/track.interface';
import { Album } from '../entities/albums/interface/album.interface';
import { Artist } from '../entities/artists/interface/artist.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DB implements DBInterface {
  users = new DBEntity<User>();
  tracks = new DBEntity<Track>();
  albums = new DBEntity<Album>();
  artists = new DBEntity<Artist>();
}
