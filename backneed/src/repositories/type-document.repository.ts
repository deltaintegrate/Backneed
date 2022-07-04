import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbNeedzaioDataSource} from '../datasources';
import {TypeDocument, TypeDocumentRelations} from '../models';

export class TypeDocumentRepository extends DefaultCrudRepository<
  TypeDocument,
  typeof TypeDocument.prototype.id,
  TypeDocumentRelations
> {
  constructor(
    @inject('datasources.db_needzaio') dataSource: DbNeedzaioDataSource,
  ) {
    super(TypeDocument, dataSource);
  }
}
