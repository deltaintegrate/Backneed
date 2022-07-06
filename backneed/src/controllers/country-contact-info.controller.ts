import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Country,
  ContactInfo,
} from '../models';
import {CountryRepository} from '../repositories';

export class CountryContactInfoController {
  constructor(
    @repository(CountryRepository) protected countryRepository: CountryRepository,
  ) { }

  @get('/countries/{id}/contact-info', {
    responses: {
      '200': {
        description: 'Country has one ContactInfo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ContactInfo),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ContactInfo>,
  ): Promise<ContactInfo> {
    return this.countryRepository.contactInfo(id).get(filter);
  }

  @post('/countries/{id}/contact-info', {
    responses: {
      '200': {
        description: 'Country model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInfo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Country.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {
            title: 'NewContactInfoInCountry',
            exclude: ['id'],
            optional: ['countryId']
          }),
        },
      },
    }) contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    return this.countryRepository.contactInfo(id).create(contactInfo);
  }

  @patch('/countries/{id}/contact-info', {
    responses: {
      '200': {
        description: 'Country.ContactInfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {partial: true}),
        },
      },
    })
    contactInfo: Partial<ContactInfo>,
    @param.query.object('where', getWhereSchemaFor(ContactInfo)) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.countryRepository.contactInfo(id).patch(contactInfo, where);
  }

  @del('/countries/{id}/contact-info', {
    responses: {
      '200': {
        description: 'Country.ContactInfo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContactInfo)) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.countryRepository.contactInfo(id).delete(where);
  }
}
