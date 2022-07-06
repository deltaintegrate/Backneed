import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Country} from './country.model';

@model({settings: {strict: false}})
export class ContactInfo extends Entity {
  @property({
    type: 'string',
    default: null,
  })
  Address?: string;

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
  City?: string;

  @property({
    type: 'string',
    default: null,
  })
  Phone?: string;

  @property({
    type: 'string',
    default: null,
  })
  Cellphone?: string;

  @property({
    type: 'string',
    default: null,
  })
  EmergencyName?: string;

  @property({
    type: 'string',
    default: null,
  })
  EmergencyPhone?: string;

  @property({
    type: 'number',
  })
  userId?: number;

  @belongsTo(() => Country)
  countryId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ContactInfo>) {
    super(data);
  }
}

export interface ContactInfoRelations {
  // describe navigational properties here
}

export type ContactInfoWithRelations = ContactInfo & ContactInfoRelations;
