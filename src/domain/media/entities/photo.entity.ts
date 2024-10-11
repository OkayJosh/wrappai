/**
 * This module is responsible for managing photo-related operations.
 * It defines the Photo entity, which represents a photo in the system,
 * and includes both the photo's primary attributes (like URL and title)
 * as well as metadata (like height, width, and format).
 *
 * @module MediaModule
 */

import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { Playlist } from "./playlist.entity";

/**
 * Represents a Photo entity, including metadata.
 * A photo can be linked with various attributes and metadata, such as dimensions, format, and capture time.
 * This entity inherits from BaseUUIDEntity, which provides a UUID primary key and timestamps for creation and updates.
 */
@Entity()
export class Photo extends BaseUUIDEntity {
  /**
   * Column name: url
   * The URL where the photo is hosted or stored.
   */
  @Column({ type: "varchar", length: 255 })
  url: string;

  /**
   * Column name: title
   * The title or name given to the photo. It serves as a user-friendly identifier.
   */
  @Column({ type: "varchar", length: 255 })
  title: string;

  /**
   * Column name: description
   * A brief description or additional information about the photo.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  description: string | null;

  /**
   * Metadata fields
   */

  /**
   * Column name: height
   * The height of the photo in pixels.
   */
  @Column({ type: "int" })
  height: number;

  /**
   * Column name: width
   * The width of the photo in pixels.
   */
  @Column({ type: "int" })
  width: number;

  /**
   * Column name: format
   * The format of the photo, e.g., JPEG, PNG, or other supported formats.
   */
  @Column({ type: "varchar", length: 50 })
  format: string;

  /**
   * Column name: capturedAt
   * The timestamp indicating when the photo was captured.
   */
  @Column({ type: "timestamp" })
  capturedAt: Date;

  /**
   * Many-to-One relationship with the Playlist entity.
   * A photo can belong to one playlist.
   */
  @ManyToOne(() => Photo, (photo) => photo.playlist, { nullable: true })
  playlist: Relation<Playlist> | null;
}
