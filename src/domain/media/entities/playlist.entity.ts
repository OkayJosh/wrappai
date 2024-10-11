/**
 * This module is responsible for managing playlists, which can contain music, photos, and videos.
 * The Playlist entity represents a collection of media items and can belong to a specific studio.
 *
 * @module MediaModule
 */
import { Column, Entity, OneToMany, ManyToOne, Relation } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { Studio } from "../../studio/entities/studio.entity";
import { Music } from "./music.entity";
import { Photo } from "./photo.entity";
import { Video } from "./video.entity";

/**
 * Represents a Playlist entity, which can hold various types of media.
 * A playlist can belong to a studio and contain multiple music tracks, photos, and videos.
 * This entity inherits from BaseUUIDEntity, which provides a UUID primary key and timestamps for creation and updates.
 */
@Entity()
export class Playlist extends BaseUUIDEntity {
  /**
   * Column name: title
   * The title of the playlist, serving as a user-friendly identifier.
   */
  @Column({ type: "varchar", length: 255 })
  title: string;

  /**
   * Column name: description
   * A brief description of the playlist's content or theme.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  description: string | null;

  /**
   * One-to-Many relationship with the Music entity.
   * A playlist can contain multiple music tracks.
   */
  @OneToMany(() => Music, (music) => music.playlist, { nullable: true })
  music: Relation<Music[]>;

  /**
   * One-to-Many relationship with the Photo entity.
   * A playlist can contain multiple photos.
   */
  @OneToMany(() => Photo, (photo) => photo.playlist, { nullable: true })
  photos: Relation<Photo[]>;

  /**
   * One-to-Many relationship with the Video entity.
   * A playlist can contain multiple videos.
   */
  @OneToMany(() => Video, (video) => video.playlist, { nullable: true })
  videos: Relation<Video[]>;

  /**
   * Many-to-One relationship with the Studio entity.
   * A playlist can belong to one studio.
   */
  @ManyToOne(() => Studio, (studio) => studio.playlist, { nullable: true })
  studio: Relation<Studio> | null;
}
