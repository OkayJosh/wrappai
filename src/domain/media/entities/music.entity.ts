/**
 * This module is responsible for managing music-related operations.
 * It defines the Music entity, which represents a music track in the system,
 * and includes both the track's primary attributes (like URL, title, and artist)
 * as well as metadata (like duration, genre, and format).
 *
 *
 * @module MediaModule
 */
import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { Playlist } from "./playlist.entity";

/**
 * Represents a Music entity, including metadata.
 * A music track can be linked with various attributes and metadata, such as duration, genre, and format.
 * This entity inherits from BaseUUIDEntity, which provides a UUID primary key and timestamps for creation and updates.
 */
@Entity()
export class Music extends BaseUUIDEntity {
  /**
   * Column name: url
   * The URL where the music track is hosted or stored.
   */
  @Column({ type: "varchar", length: 255 })
  url: string;

  /**
   * Column name: title
   * The title of the music track, serving as a user-friendly identifier.
   */
  @Column({ type: "varchar", length: 255 })
  title: string;

  /**
   * Column name: artist
   * The name of the artist or band who performed the music track.
   */
  @Column({ type: "varchar", length: 255 })
  artist: string;

  /**
   * Column name: album
   * The name of the album to which the music track belongs.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  album: string | null;

  /**
   * Column name: genre
   * The genre of the music track (e.g., Rock, Pop, Jazz).
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 100, nullable: true })
  genre: string | null;

  /**
   * Column name: duration
   * The duration of the music track in seconds.
   */
  @Column({ type: "int" })
  duration: number;

  /**
   * Column name: format
   * The format of the music file, e.g., MP3, WAV, or other supported formats.
   */
  @Column({ type: "varchar", length: 50 })
  format: string;

  /**
   * Column name: releasedAt
   * The timestamp indicating when the music track was released.
   */
  @Column({ type: "timestamp" })
  releasedAt: Date;

  /**
   * Many-to-One relationship with the Playlist entity.
   * A Music can belong to one playlist.
   */
  @ManyToOne(() => Music, (music) => music.playlist, { nullable: true })
  playlist: Relation<Playlist> | null;
}
