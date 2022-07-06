import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {DbNeedzaioDataSource} from '../datasources';
import {UserDocument, UserDocumentRelations, TypeDocument, User} from '../models';
import {TypeDocumentRepository} from './type-document.repository';
import {UserRepository} from './user.repository';

export class UserDocumentRepository extends DefaultCrudRepository<
  UserDocument,
  typeof UserDocument.prototype.id,
  UserDocumentRelations
> {

  public readonly typeDocument: HasOneRepositoryFactory<TypeDocument, typeof UserDocument.prototype.id>;

  public readonly user: HasOneRepositoryFactory<User, typeof UserDocument.prototype.id>;

  constructor(
    @inject('datasources.db_needzaio') dataSource: DbNeedzaioDataSource, @repository.getter('TypeDocumentRepository') protected typeDocumentRepositoryGetter: Getter<TypeDocumentRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, 
  ) {
    super(UserDocument, dataSource);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.typeDocument = this.createHasOneRepositoryFactoryFor('typeDocument', typeDocumentRepositoryGetter);
    this.registerInclusionResolver('typeDocument', this.typeDocument.inclusionResolver);
  }
}
