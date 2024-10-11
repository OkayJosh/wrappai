/**
 * BaseUUIDEntity is an abstract class that provides a common structure
 * for all entities requiring a UUID as their primary key,
 * along with automatic timestamping for creation and updates.
 *
 * This class extends TypeORM's BaseEntity and automatically handles:
 * - UUID generation as the primary key.
 * - Timestamps for when entities are created and updated.
 *
 * @abstract
 */

import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

export abstract class BaseUUIDEntity extends BaseEntity {
  /**
   * Column name: uuid
   * The primary key of the entity, which is automatically generated
   * using UUIDv4 upon entity creation.
   */
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  /**
   * Column name: createdAt
   * Timestamp indicating when the entity was created.
   * This is automatically set by TypeORM.
   */
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  /**
   * Column name: updatedAt
   * Timestamp indicating when the entity was last updated.
   * This is automatically managed by TypeORM.
   */
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}

/**
 * Represents a base entity for all media items (e.g., videos, photos, and music).
 * It includes common fields for media attributes, asset life cycle management, versioning, multiple formats,
 * file storage, technical details, tracking and analytics, and rights management (DRM).
 *
 * @abstract
 */

export abstract class BaseMediaItem extends BaseUUIDEntity {
  /**
   * Column name: url
   * The URL where the media item is hosted or stored.
   */
  @Column({ type: "varchar", length: 255 })
  url: string;

  /**
   * Column name: title
   * The title of the media item, serving as a user-friendly identifier.
   */
  @Column({ type: "varchar", length: 255 })
  title: string;

  /**
   * Column name: description
   * A brief description or additional information about the media item.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  description: string | null;

  // === Asset Life Cycle Management ===

  /**
   * Column name: status
   * The current status of the media item in its life cycle (e.g., "active", "archived", "deleted").
   */
  @Column({ type: "varchar", length: 50, default: "active" })
  status: string;

  /**
   * Column name: archivedAt
   * The timestamp when the media item was archived (if applicable).
   * This field is optional and only populated if the media is archived.
   */
  @Column({ type: "timestamp", nullable: true })
  archivedAt: Date | null;

  /**
   * Column name: deletedAt
   * The timestamp when the media item was deleted (if applicable).
   * This field is optional and only populated if the media is deleted.
   */
  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date | null;

  // === Versioning and Multiple Formats ===

  /**
   * Column name: version
   * The version number of the media item, useful for tracking changes and updates.
   */
  @Column({ type: "int", default: 1 })
  version: number;

  /**
   * Column name: availableFormats
   * A list of formats available for the media item, e.g., MP4, MP3, JPEG.
   */
  @Column({ type: "simple-array", nullable: true })
  availableFormats: string[] | null;

  // === File Storage and Technical Details ===

  /**
   * Column name: fileSize
   * The size of the media file in bytes.
   */
  @Column({ type: "bigint" })
  fileSize: number;

  /**
   * Column name: format
   * The format of the media file (e.g., MP4 for videos, JPEG for photos).
   */
  @Column({ type: "varchar", length: 50 })
  format: string;

  /**
   * Column name: mimeType
   * The MIME type of the media file (e.g., "image/jpeg", "video/mp4").
   */
  @Column({ type: "varchar", length: 100 })
  mimeType: string;

  /**
   * Column name: storagePath
   * The file path or identifier in the storage system (could be a cloud URL or a local path).
   */
  @Column({ type: "varchar", length: 255 })
  storagePath: string;

  /**
   * Column name: checksum
   * A checksum or hash value for file integrity verification (e.g., MD5, SHA-256).
   */
  @Column({ type: "varchar", length: 64, nullable: true })
  checksum: string | null;

  // === Storage and Hosting ===

  /**
   * Column name: storageProvider
   * The name of the storage provider where the media file is hosted (e.g., AWS S3, Google Cloud Storage).
   */
  @Column({ type: "varchar", length: 100 })
  storageProvider: string;

  /**
   * Column name: hostingLocation
   * The physical or cloud region where the media is stored (e.g., "US-West", "EU-Central").
   */
  @Column({ type: "varchar", length: 100 })
  hostingLocation: string;

  // === Tracking and Analytics ===

  /**
   * Column name: viewCount
   * The number of times this media item has been viewed or accessed.
   */
  @Column({ type: "int", default: 0 })
  viewCount: number;

  /**
   * Column name: downloadCount
   * The number of times this media item has been downloaded (if applicable).
   */
  @Column({ type: "int", default: 0 })
  downloadCount: number;

  /**
   * Column name: lastAccessedAt
   * The timestamp when the media item was last viewed or accessed.
   */
  @Column({ type: "timestamp", nullable: true })
  lastAccessedAt: Date | null;

  // === Rights Management and DRM ===

  /**
   * Column name: drmProtected
   * Indicates whether DRM protection is enabled for this media item.
   */
  @Column({ type: "boolean", default: false })
  drmProtected: boolean;

  /**
   * Column name: drmType
   * Specifies the type of DRM applied to the media (e.g., "Widevine", "FairPlay", "PlayReady").
   * This field is nullable in case DRM is not applied.
   */
  @Column({ type: "varchar", length: 50, nullable: true })
  drmType: string | null;

  /**
   * Column name: licenseExpiryDate
   * Specifies the expiry date of the license for the media item.
   * After this date, the media may no longer be accessible or viewable.
   */
  @Column({ type: "date", nullable: true })
  licenseExpiryDate: Date | null;

  /**
   * Column name: regionRestrictions
   * A comma-separated list of ISO country codes specifying regions where the media
   * is restricted. Example: "US,CA,GB" would restrict the media in the US, Canada, and UK.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  regionRestrictions: string | null;

  /**
   * Column name: downloadAllowed
   * A boolean flag indicating whether the media can be downloaded by users.
   * Default is false, meaning streaming-only access for non-downloadable items.
   */
  @Column({ type: "boolean", default: false })
  downloadAllowed: boolean;

  /**
   * Column name: streamingAllowed
   * A boolean flag indicating whether the media can be streamed.
   * Default is true, but can be toggled to restrict streaming access.
   */
  @Column({ type: "boolean", default: true })
  streamingAllowed: boolean;
}
