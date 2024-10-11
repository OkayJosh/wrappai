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
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  /**
   * Column name: updatedAt
   * Timestamp indicating when the entity was last updated.
   * This is automatically managed by TypeORM.
   */
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
