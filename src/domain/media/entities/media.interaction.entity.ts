/**
 * Represents a record of interactions between users and media (music, photo, video, or playlist).
 * Tracks whether a user has watched, seen, or paid for a specific media item or playlist.
 *
 * @module MediaModule
 */

import { Entity, Column, ManyToOne, Relation } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { User } from "../../user/entities/user.entity";
import { Music } from "./music.entity";
import { Photo } from "./photo.entity";
import { Video } from "./video.entity";
import { Playlist } from "./playlist.entity";

/**
 * MediaInteraction entity tracks the interactions of users with different media types
 * (music, photo, video, or playlist). The interaction can represent actions like watching,
 * seeing, or paying for the media.
 */
@Entity()
export class MediaInteraction extends BaseUUIDEntity {
  /**
   * Column name: interactionType
   * Defines the type of interaction a user has with the media.
   * Possible values: "WATCHED", "SEEN", "PAID".
   */
  @Column({ type: "varchar", length: 50 })
  interactionType: string;

  /**
   * Column name: timestamp
   * Indicates when the interaction occurred.
   */
  @Column({ type: "timestamp" })
  timestamp: Date;

  /**
   * Many-to-One relationship with the User entity.
   * Tracks which user interacted with the media.
   */
  @ManyToOne(() => User, (user) => user.mediaInteractions)
  user: Relation<User>;

  /**
   * Many-to-One relationship with the Music entity.
   * Stores the reference to the music the user interacted with (if applicable).
   * This field is nullable since the interaction may involve other types of media.
   */
  @ManyToOne(() => Music, { nullable: true })
  music: Relation<Music> | null;

  /**
   * Many-to-One relationship with the Photo entity.
   * Stores the reference to the photo the user interacted with (if applicable).
   * This field is nullable since the interaction may involve other types of media.
   */
  @ManyToOne(() => Photo, { nullable: true })
  photo: Relation<Photo> | null;

  /**
   * Many-to-One relationship with the Video entity.
   * Stores the reference to the video the user interacted with (if applicable).
   * This field is nullable since the interaction may involve other types of media.
   */
  @ManyToOne(() => Video, { nullable: true })
  video: Relation<Video> | null;

  /**
   * Many-to-One relationship with the Playlist entity.
   * Stores the reference to the playlist the user interacted with (if applicable).
   * This field is nullable since the interaction may involve individual media items.
   */
  @ManyToOne(() => Playlist, { nullable: true })
  playlist: Relation<Playlist> | null;
}
