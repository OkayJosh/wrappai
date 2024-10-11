/**
 * Represents a Notification entity that tracks the status of messages
 * sent to users via different channels (email, SMS, WhatsApp).
 * It compresses the message body using zlib for efficient storage.
 *
 * This module manages notifications for users and links them to a specific studio.
 *
 * @module NotificationModule
 */

import {
  Entity,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  Relation,
} from "typeorm";
import { deflate, unzip } from "node:zlib";
import { BaseUUIDEntity } from "../../entities/base";
import { Studio } from "../../studio/entities/studio.entity";
import { promisify } from "util";
import { User } from "../../user/entities/user.entity";

const deflateAsync = promisify(deflate);
const unzipAsync = promisify(unzip);

@Entity()
export class Notification extends BaseUUIDEntity {
  /**
   * Relationship with the Studio entity.
   * Represents the studio that the notification is associated with.
   */
  @ManyToOne(() => Studio, (studio) => studio.notifications, {
    nullable: true,
    onDelete: "SET NULL",
  })
  studio: Relation<Studio> | null;

  /**
   * Relationship with the User entity.
   * Represents the user who will receive the notification.
   */
  @ManyToOne(() => User, (user) => user.notifications, {
    nullable: true,
    onDelete: "SET NULL",
  })
  user: Relation<User> | null;

  /**
   * The communication channel through which the notification is sent.
   * Possible values: "email", "SMS", "WhatsApp".
   */
  @Column({
    type: "enum",
    enum: ["email", "SMS", "WhatsApp"],
    default: "WhatsApp",
  })
  channel: string;

  /**
   * Compressed message body for efficient storage.
   */
  @Column({ type: "bytea" })
  message: Buffer;

  /**
   * Status of the notification, indicating if it is pending, sent, or failed.
   * Default value is "pending".
   */
  @Column({
    type: "enum",
    enum: ["pending", "sent", "failed"],
    default: "pending",
  })
  status: string;

  /**
   * The scheduled time to send the notification.
   */
  @Column({ type: "timestamp" })
  sendAt: Date;

  /**
   * The time when the notification was delivered.
   * This field is optional and can be null.
   */
  @Column({ type: "timestamp", nullable: true })
  deliveredAt: Date | null;

  /**
   * Log for any errors encountered during notification delivery.
   * This field is optional and can be null.
   */
  @Column({ type: "text", nullable: true })
  errorLog: string | null;

  /**
   * The subject of the notification message.
   * This field is optional and can be null.
   */
  @Column({ type: "varchar", length: 255, nullable: true })
  subject: string | null;

  /**
   * Compresses the message body before saving the entity.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async compressMessage() {
    if (this.message) {
      try {
        this.message = await deflateAsync(this.message.toString("utf-8"));
      } catch (error) {
        console.error("Compression error:", error);
      }
    }
  }

  /**
   * Decompresses the message body and returns it as a string.
   * @returns {Promise<string>} The decompressed message.
   */
  async getMessage(): Promise<string> {
    let message = "";
    const buffer = Buffer.from(this.message);
    try {
      const decompressedBuffer = await unzipAsync(buffer);
      message = decompressedBuffer.toString("utf-8");
    } catch (error) {
      console.error("Decompression error:", error);
    }
    return message;
  }
}
