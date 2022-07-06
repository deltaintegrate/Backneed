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
  User,
  ContactInfo,
} from '../models';
import {UserRepository} from '../repositories';

export class UserContactInfoController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/contact-info', {
    responses: {
      '200': {
        description: 'User has one ContactInfo',
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
    return this.userRepository.contactInfo(id).get(filter);
  }

  @post('/users/{id}/contact-info', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContactInfo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContactInfo, {
            title: 'NewContactInfoInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) contactInfo: Omit<ContactInfo, 'id'>,
  ): Promise<ContactInfo> {
    return this.userRepository.contactInfo(id).create(contactInfo);
  }

  @patch('/users/{id}/contact-info', {
    responses: {
      '200': {
        description: 'User.ContactInfo PATCH success count',
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
    return this.userRepository.contactInfo(id).patch(contactInfo, where);
  }

  @del('/users/{id}/contact-info', {
    responses: {
      '200': {
        description: 'User.ContactInfo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContactInfo)) where?: Where<ContactInfo>,
  ): Promise<Count> {
    return this.userRepository.contactInfo(id).delete(where);
  }
}
