import { Injectable } from '@nestjs/common';
import { assign, cloneDeep } from 'lodash';

import { UserInterface, UsersListResponseInterface, UserResponseInterface } from './types';
import { generatedUsersList } from './users.generated';

const MAX_USERS_LIST_LENGTH = 128;

@Injectable()
export class AppService {

  sessions: {[key: string]: UserInterface[]} = {};

  getHello(): string {
    return 'Hello World!';
  }

  getUsers(session: string, skip?: number, count?: number, search?: string): UsersListResponseInterface {
    if (skip === undefined) {
      skip = 0;
    }
    if (count === undefined) {
      count = MAX_USERS_LIST_LENGTH;
    }

    let users: UserInterface[] = this.initSession(session);
    if (skip < 0) {
      throw new Error('Invalid "skip" value');
    }
    if (count < 1) {
      throw new Error('Invalid "count" value');
    }

    if (search) {
      users = users.filter(a => a.id.includes(search) || a.email.includes(search) || a.first_name.includes(search) || a.last_name.includes(search));
    }
    return {
      items: users.slice(Number(skip), Number(skip) + Number(count)),
      total: users.length,
    };
  }

  getUser(session: string, id: string): UserResponseInterface {
    const users: UserInterface[] = this.initSession(session);

    const user: UserInterface = users.find(a => a.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      item: user,
    };
  }

  addUser(session: string, user: UserInterface): UserResponseInterface {
    const users: UserInterface[] = this.initSession(session);
    if (!user.email) {
      throw new Error('Empty email');
    }
    if (users.length >= MAX_USERS_LIST_LENGTH) {
      throw new Error('There are already too many users');
    }
    user.id = 'id' + Math.random().toString().substr(2);
    users.push(user);
    this.sessions[session] = users;
    return {
      item: user,
    };
  }

  patchUser(session: string, id: string, data: UserInterface): UserResponseInterface {
    const users: UserInterface[] = this.initSession(session);

    delete data.id; // We do not allow to change id
    const user: UserInterface = users.find(a => a.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    const newUser: UserInterface = assign(cloneDeep(user), data);
    if (!newUser.email) {
      throw new Error('Email cant be empty');
    }
    assign(user, newUser); // Saving
    return {
      item: user,
    };
  }

  removeUser(session: string, id: string): UserResponseInterface {
    const users: UserInterface[] = this.initSession(session);

    const user: UserInterface = users.find(a => a.id === id);
    const newUsers: UserInterface[] = users.filter(a => a.id !== id);
    if (users.length === newUsers.length) {
      throw new Error('User not found');
    }
    this.sessions[session] = newUsers;
    return {
      item: user,
    };
  }

  initSession(session: string): UserInterface[] {
    if (!this.sessions[session]) {
      this.sessions[session] = cloneDeep(generatedUsersList);
    }
    return this.sessions[session];
  }
}
