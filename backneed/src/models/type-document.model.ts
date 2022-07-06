import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {UserDocument} from './user-document.model';

@model()
export class TypeDocument extends Entity {
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
  NameTypeDocument: string;

  @belongsTo(() => UserDocument)
  userDocumentId: number;

  constructor(data?: Partial<TypeDocument>) {
    super(data);
  }
}

export interface TypeDocumentRelations {
  // describe navigational properties here
}

export type TypeDocumentWithRelations = TypeDocument & TypeDocumentRelations;
