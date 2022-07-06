import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbNeedzaioDataSource} from '../datasources';
import {ContactInfo, ContactInfoRelations, Country} from '../models';
import {CountryRepository} from './country.repository';

export class ContactInfoRepository extends DefaultCrudRepository<
  ContactInfo,
  typeof ContactInfo.prototype.id,
  ContactInfoRelations
> {

  public readonly country: BelongsToAccessor<Country, typeof ContactInfo.prototype.id>;

  constructor(
    @inject('datasources.db_needzaio') dataSource: DbNeedzaioDataSource, @repository.getter('CountryRepository') protected countryRepositoryGetter: Getter<CountryRepository>,
  ) {
    super(ContactInfo, dataSource);
    this.country = this.createBelongsToAccessorFor('country', countryRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
  }
}
