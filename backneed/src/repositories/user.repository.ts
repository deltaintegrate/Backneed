import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbNeedzaioDataSource} from '../datasources';
import {User, UserRelations, ContactInfo} from '../models';
import {ContactInfoRepository} from './contact-info.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {


  public readonly contactInfo: HasOneRepositoryFactory<ContactInfo, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db_needzaio') dataSource: DbNeedzaioDataSource, @repository.getter('ContactInfoRepository') protected contactInfoRepositoryGetter: Getter<ContactInfoRepository>,
  ) {
    super(User, dataSource);
    this.contactInfo = this.createHasOneRepositoryFactoryFor('contactInfo', contactInfoRepositoryGetter);
    this.registerInclusionResolver('contactInfo', this.contactInfo.inclusionResolver);
  }
}
