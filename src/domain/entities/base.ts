import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuidv4 } from "uuid";

export abstract class BaseUUIDEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  constructor() {
    super();
    // Automatically generate UUID on entity creation
    this.id = uuidv4();
  }
}
