import { BaseListResponseInterface, BaseResponseInterface } from '../../types';

export interface UserInterface {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export class PatchUserDto {
  readonly email?: string;
  readonly first_name?: string; // tslint:disable-line
  readonly last_name?: string; // tslint:disable-line
}

export class CreateUserDto {
  readonly email: string;
  readonly first_name?: string; // tslint:disable-line
  readonly last_name?: string; // tslint:disable-line
}

export interface UsersListResponseInterface extends BaseListResponseInterface<UserInterface> {
}

export interface UserResponseInterface extends BaseResponseInterface<UserInterface> {
}
