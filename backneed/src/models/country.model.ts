import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserDocument} from './user-document.model';
import {ContactInfo} from './contact-info.model';

@model()
export class Country extends Entity {
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
  CountryCode: string;

  @property({
    type: 'string',
    required: true,
  })
  CountryName: string;

  @hasOne(() => UserDocument)
  userDocument: UserDocument;

  @hasOne(() => ContactInfo)
  contactInfo: ContactInfo;

  constructor(data?: Partial<Country>) {
    super(data);
  }
}

export interface CountryRelations {
  // describe navigational properties here
}

export type CountryWithRelations = Country & CountryRelations;
