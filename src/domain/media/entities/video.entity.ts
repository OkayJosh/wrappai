/**
 * This module is responsible for managing video-related operations.
 * It defines the Video entity, which represents a video in the system,
 * and includes both the video's primary attributes (like URL, title, and description)
 * as well as metadata (like duration, resolution, and format).
 *
 *
 * @module MediaModule
 */
import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { Playlist } from "./playlist.entity";

/**
 * Represents a Video entity, including metadata.
 * A video can be linked with various attributes and metadata, such as duration, resolution, and format.
 * This entity inherits from BaseUUIDEntity, which provides a UUID primary key and timestamps for creation and updates.
 */
@Entity()
export class Video extends BaseUUIDEntity {
  /**
   * Column name: url
   * The URL where the video is hosted or stored.
   */
  @Column({ type: "varchar", length: 255 })
  url: string;

  /**
   * Column name: title
   * The title of the video, serving as a user-friendly identifier.
   */
  @Column({ type: "varchar", length: 255 })
  title: string;

  /**
   * Column name: description
   * A brief description or additional information about the video.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  description: string | null;

  /**
   * Column name: duration
   * The duration of the video in seconds.
   */
  @Column({ type: "int" })
  duration: number;

  /**
   * Column name: resolution
   * The resolution of the video (e.g., 1920x1080).
   */
  @Column({ type: "varchar", length: 20 })
  resolution: string;

  /**
   * Column name: format
   * The format of the video file, e.g., MP4, AVI, or other supported formats.
   */
  @Column({ type: "varchar", length: 50 })
  format: string;

  /**
   * Column name: uploadedAt
   * The timestamp indicating when the video was uploaded.
   */
  @Column({ type: "timestamp" })
  uploadedAt: Date;

  /**
   * Many-to-One relationship with the Playlist entity.
   * A video can belong to one playlist.
   */
  @ManyToOne(() => Video, (video) => video.playlist, { nullable: true })
  playlist: Relation<Playlist> | null;
}
