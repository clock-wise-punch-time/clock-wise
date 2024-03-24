import { SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator";
import { Roles as RolesType } from "../types/roles";

export const ROLES_KEY = "ROLES";
export const Roles = (rolesList: RolesType[]) =>
  SetMetadata(ROLES_KEY, rolesList);
