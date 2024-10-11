/**
 * The Studio entity represents a studio owned or managed by a user.
 * It contains information such as the studio's name, description, status,
 * and its relationship with the User entity.
 * @module StudioModule
 */

import { BaseUUIDEntity } from "../../entities/base";
import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Playlist } from "../../media/entities/playlist.entity";
import { Notification } from "../../notification/entities/notification.entity";

@Entity()
export class Studio extends BaseUUIDEntity {
  /**
   * Column name: status
   * Describes the current status of the studio.
   * Possible values could include:
   *  - "IN-REVIEW": The studio is being reviewed.
   *  - "APPROVED": The studio has been approved.
   * Defaults to "IN-REVIEW".
   */
  @Column({ type: "varchar", length: 255, default: "IN-REVIEW" })
  status: string;

  /**
   * Many-to-One relationship with User entity.
   * This establishes a foreign key relationship between Studio and User.
   * Each studio is owned or managed by a single user.
   */
  @ManyToOne(() => User, (user) => user.studios, { nullable: true })
  user: User | null;

  /**
   * Column name: name
   * The name of the studio. This field is required.
   */
  @Column({ type: "varchar", length: 255 })
  name: string;

  /**
   * Column name: description
   * A brief description of the studio.
   */
  @Column({ type: "varchar", length: 255 })
  description: string;

  /**
   * Column name: picture_url
   * The URL of the studio's profile picture. This field is optional.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  picture_url: string | null;

  /**
   * One-to-Many relationship with Playlist entity.
   * A studio can manage or own multiple playlist, thus establishing a one-to-many relationship.
   */
  @OneToMany(() => Playlist, (playlist) => playlist.studio)
  playlist: Relation<Playlist[]>;

  /**
   * One-to-Many relationship with Notification entity.
   * A studio can manage or own multiple notifications, thus establishing a one-to-many relationship.
   */
  @OneToMany(() => Notification, (notification) => notification.studio)
  notifications: Relation<Notification[]>;
}
