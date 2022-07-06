import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbNeedzaioDataSource} from '../datasources';
import {Country, CountryRelations, ContactInfo} from '../models';
import {ContactInfoRepository} from './contact-info.repository';

export class CountryRepository extends DefaultCrudRepository<
  Country,
  typeof Country.prototype.id,
  CountryRelations
> {

  public readonly contactInfo: HasOneRepositoryFactory<ContactInfo, typeof Country.prototype.id>;

  constructor(
    @inject('datasources.db_needzaio') dataSource: DbNeedzaioDataSource, @repository.getter('ContactInfoRepository') protected contactInfoRepositoryGetter: Getter<ContactInfoRepository>, 
  ) {
    super(Country, dataSource);
    this.contactInfo = this.createHasOneRepositoryFactoryFor('contactInfo', contactInfoRepositoryGetter);
    this.registerInclusionResolver('contactInfo', this.contactInfo.inclusionResolver);
    
  }
}
