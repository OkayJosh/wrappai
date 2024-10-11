/**
 * This module is responsible for handling all user-related operations.
 * It defines the User entity, which represents a user in the system,
 * and includes relationships to other entities such as Device and Studio.
 *
 * This module interacts with the database through TypeORM and establishes
 * one-to-many relationships between User and other entities.
 *
 * @module UserModule
 */

import { Column, Entity, OneToMany, Relation } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { Device } from "../../device/entities/device.entity";
import { Studio } from "../../studio/entities/studio.entity";
import { MediaInteraction } from "../../media/entities/media.interaction.entity";
import { Notification } from "../../notification/entities/notification.entity";

@Entity()
export class User extends BaseUUIDEntity {
  /**
   * Column name: accountType
   * Describes the type of account the user holds.
   * It can either be:
   *  - "WATCHER": A regular user who consumes content.
   *  - "STUDIO": A user who owns or manages a studio.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  accountType: string | null;

  /**
   * Column name: channel
   * Specifies the platform or media from which the user is signing up.
   * Possible values include:
   *  - "WEB": Web application.
   *  - "MOBILE": Mobile application.
   *  - "WAITLIST": Pre-signup via a waitlist.
   *  - "CAMPAIGN": Promotional or marketing campaign.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  channel: string | null;

  /**
   * Column name: phoneNumber
   * Stores the user's primary phone number.
   * This field must be unique for each user to avoid duplicate entries.
   */
  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  phoneNumber: string | null;

  /**
   * Column name: secondaryPhoneNumber
   * Stores an additional phone number for the user, if provided.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  secondaryPhoneNumber: string | null;

  /**
   * Column name: email
   * Stores the user's primary email address.
   * This field must be unique for each user to ensure no duplicate email addresses.
   */
  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  /**
   * Column name: secondaryEmail
   * Stores an additional email address for the user, if provided.
   * This field is optional and can be left empty.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  secondaryEmail: string | null;

  /**
   * Column name: validatedPhoneNumber
   * A boolean flag that indicates whether the user's phone number has been validated.
   * Defaults to `false` until the phone number is confirmed.
   */
  @Column({ type: "boolean", default: false })
  validatedPhoneNumber: boolean;

  /**
   * Column name: validatedEmail
   * A boolean flag that indicates whether the user's email address has been validated.
   * Defaults to `false` until the email is confirmed.
   */
  @Column({ type: "boolean", default: false })
  validatedEmail: boolean;

  /**
   * Column name: pin
   * Stores a secure personal identification number (PIN) for the user.
   * This is typically used for additional authentication layers.
   */
  @Column({ type: "varchar", length: 128 })
  pin: string;

  /**
   * Column name: password_hash
   * Stores the hashed version of the user's password for secure authentication.
   */
  @Column({ type: "varchar", length: 255 })
  password_hash: string;

  /**
   * Column name: dateOfBirth
   * Stores the user's date of birth.
   * This field is optional and may be left empty if the user doesn't provide it.
   */
  @Column({ type: "date", nullable: true })
  dateOfBirth: Date | null;

  /**
   * One-to-Many relationship with Device entity.
   * A user can have multiple devices associated with their account.
   */
  @OneToMany(() => Device, (device) => device.user)
  devices: Relation<Device[]>;

  /**
   * One-to-Many relationship with Studio entity.
   * A user can manage or own multiple studios, thus establishing a one-to-many relationship.
   */
  @OneToMany(() => Studio, (studio) => studio.user)
  studios: Relation<Studio[]>;

  /**
   * One-to-Many relationship with MediaInteraction entity.
   * A user can manage or own multiple mediaInteraction, thus establishing a one-to-many relationship.
   */
  @OneToMany(
    () => MediaInteraction,
    (mediaInteraction) => mediaInteraction.user,
  )
  mediaInteractions: Relation<MediaInteraction[]>;

  /**
   * One-to-Many relationship with Notification entity.
   * A user can manage or own multiple notification, thus establishing a one-to-many relationship.
   */
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Relation<Notification[]>;
}
