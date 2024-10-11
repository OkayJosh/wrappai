/**
 * The Device entity represents a user's device that has logged into the system.
 * It includes information such as device name, FCM token for push notifications,
 * login/logout times, and the associated user.
 * @module DeviceModule
 */

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseUUIDEntity } from "../../entities/base";
import { User } from "../../user/entities/user.entity";


@Entity()
export class Device extends BaseUUIDEntity {
  /**
   * Name of the device (e.g., "John's iPhone").
   * This field is optional and can be null.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  name: string | null;

  /**
   * Firebase Cloud Messaging (FCM) token for push notifications.
   * Used to send notifications to this device. This field is optional and can be null.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  fcmToken: string | null;

  /**
   * The user who owns this device.
   * Establishes a many-to-one relationship with the User entity. This field can be null
   * if the device is not currently associated with any user.
   */
  @ManyToOne(() => User, (user) => user.devices, { nullable: true })
  @JoinColumn({ name: "user_uuid" })
  user: User | null;

  /**
   * Indicates whether the device is currently active or not (e.g., logged in).
   */
  @Column({ type: "boolean", default: false })
  active: boolean;

  /**
   * Timestamp of the last time this device logged in.
   * Defaults to the current timestamp when the record is created.
   */
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  lastLoggedInTime: Date;

  /**
   * Timestamp of the last time this device logged out.
   * This field can be null if the device has never logged out.
   */
  @Column({ type: "timestamp", nullable: true })
  lastLoggedOutTime: Date | null;
}
