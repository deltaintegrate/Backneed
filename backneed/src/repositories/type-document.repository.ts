import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbNeedzaioDataSource} from '../datasources';
import {TypeDocument, TypeDocumentRelations, UserDocument} from '../models';
import {UserDocumentRepository} from './user-document.repository';

export class TypeDocumentRepository extends DefaultCrudRepository<
  TypeDocument,
  typeof TypeDocument.prototype.id,
  TypeDocumentRelations
> {

  public readonly userDocument: BelongsToAccessor<UserDocument, typeof TypeDocument.prototype.id>;

  constructor(
    @inject('datasources.db_needzaio') dataSource: DbNeedzaioDataSource, @repository.getter('UserDocumentRepository') protected userDocumentRepositoryGetter: Getter<UserDocumentRepository>,
  ) {
    super(TypeDocument, dataSource);
    this.userDocument = this.createBelongsToAccessorFor('userDocument', userDocumentRepositoryGetter,);
    this.registerInclusionResolver('userDocument', this.userDocument.inclusionResolver);
   
  }
}
