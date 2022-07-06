import {Entity, model, property, hasOne} from '@loopback/repository';
import {ContactInfo} from './contact-info.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    default: null,
  })
  username?: string;

  @property({
    type: 'string',
    default: null,
  })
  emailVerified?: string;

  @property({
    type: 'string',
    default: null,
  })
  verificationToken?: string;

  @property({
    type: 'string',
    default: null,
  })
  LastName?: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  IsMilitar: boolean;

  @property({
    type: 'date',
    required: true,
  })
  TimeCreate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isTemporal: boolean;

  @property({
    type: 'number',
  })
  userDocumentId?: number;

  @hasOne(() => ContactInfo)
  contactInfo: ContactInfo;

  constructor(data?: Partial<User>) {
    super(data);
  }
}



export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
