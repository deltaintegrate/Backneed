import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {TypeDocument} from './type-document.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class UserDocument extends Entity {
  @property({
    type: 'string',
    default: null,
  })
  Document?: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    default: null,
  })
  PlaceExpedition?: string;

  @property({
    type: 'date',
    required: true,
  })
  DateExpedition: string;

  @hasOne(() => TypeDocument)
  typeDocument: TypeDocument;

  @hasOne(() => User)
  user: User;

  @property({
    type: 'number',
  })
  countryId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserDocument>) {
    super(data);
  }
}

export interface UserDocumentRelations {
  // describe navigational properties here
}

export type UserDocumentWithRelations = UserDocument & UserDocumentRelations;
