import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1676673218693 implements MigrationInterface {
  name = 'InitialMigration1676673218693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_51ee6369b97c61b87ff510bcd33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_7c07e38dd0d817a103966c5876e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_715d259ae16fb1e669fb69ef155" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_83cd0162b05b05e9a88cb3e5ad0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_tracks_track" ("favoritesId" uuid NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_613647698cfa077425b1047e1a6" PRIMARY KEY ("favoritesId", "trackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ecf4f6fab33cc9611b9e40292" ON "favorites_tracks_track" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fee451584feed445b14adb7fb8" ON "favorites_tracks_track" ("trackId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_albums_album" ("favoritesId" uuid NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4caba2d65763821c7dd2db51558" PRIMARY KEY ("favoritesId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31b327b5a4f89d2eb722968982" ON "favorites_albums_album" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ff0c3cde93d2bc8c23c2b72c3" ON "favorites_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_artists_artist" ("favoritesId" uuid NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_a6aeacbfda85e00ccc625a84474" PRIMARY KEY ("favoritesId", "artistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_663b6278dbd0f67925d1238ade" ON "favorites_artists_artist" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a44f2a39bd14c72dfd8ad7933" ON "favorites_artists_artist" ("artistId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_8cd82637ad035c862207206de57" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" ADD CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_fee451584feed445b14adb7fb80" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_31b327b5a4f89d2eb7229689829" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_663b6278dbd0f67925d1238ade2" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_663b6278dbd0f67925d1238ade2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_31b327b5a4f89d2eb7229689829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_fee451584feed445b14adb7fb80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" DROP CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_8cd82637ad035c862207206de57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a44f2a39bd14c72dfd8ad7933"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_663b6278dbd0f67925d1238ade"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_artists_artist"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ff0c3cde93d2bc8c23c2b72c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31b327b5a4f89d2eb722968982"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_albums_album"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fee451584feed445b14adb7fb8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ecf4f6fab33cc9611b9e40292"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_tracks_track"`);
    await queryRunner.query(`DROP TABLE "Favorites"`);
    await queryRunner.query(`DROP TABLE "Album"`);
    await queryRunner.query(`DROP TABLE "Artist"`);
    await queryRunner.query(`DROP TABLE "Track"`);
    await queryRunner.query(`DROP TABLE "User"`);
  }
}
