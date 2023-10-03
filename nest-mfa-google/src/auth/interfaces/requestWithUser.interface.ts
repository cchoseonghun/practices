import { Request } from "express";
import { User } from "src/modules/users/entities/users.entity";

export interface RequestWithUser extends Request {
  user: User & {
    isSecondFactorAuthenticated?: boolean;
  };
}