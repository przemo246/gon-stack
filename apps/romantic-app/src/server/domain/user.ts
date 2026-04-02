export type Email = string;
export type Username = string;

export class KnownUser {
  type: 'known';

  constructor(
    public email: Email,
    public username: Username,
  ) {}
}

export class UnknownUser {
  type: 'unknown';
}

export type User = KnownUser | UnknownUser;
