import { Replace } from 'src/helpers/Replace';

export interface UserProps {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(props: Replace<UserProps, { avatar?: string }>, id?: number) {
    this._id = id ?? undefined;
    this.props = {
      ...props,
      avatar: props.avatar ?? null,
    };
  }

  public set id(id: number) {
    this._id = id;
  }

  public get id(): number {
    return this._id;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set first_name(first_name: string) {
    this.props.first_name = first_name;
  }

  public get first_name(): string {
    return this.props.first_name;
  }

  public set last_name(last_name: string) {
    this.props.last_name = last_name;
  }

  public get last_name(): string {
    return this.props.last_name;
  }

  public set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  public get avatar(): string {
    return this.props.avatar;
  }
}
