import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class CoreEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}