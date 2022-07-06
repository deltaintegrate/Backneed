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
  UserDocument,
  User,
} from '../models';
import {UserDocumentRepository} from '../repositories';

export class UserDocumentUserController {
  constructor(
    @repository(UserDocumentRepository) protected userDocumentRepository: UserDocumentRepository,
  ) { }

  @get('/user-documents/{id}/user', {
    responses: {
      '200': {
        description: 'UserDocument has one User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User> {
    return this.userDocumentRepository.user(id).get(filter);
  }

  @post('/user-documents/{id}/user', {
    responses: {
      '200': {
        description: 'UserDocument model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserDocument.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInUserDocument',
            exclude: ['id'],
            optional: ['userDocumentId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userDocumentRepository.user(id).create(user);
  }

  @patch('/user-documents/{id}/user', {
    responses: {
      '200': {
        description: 'UserDocument.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userDocumentRepository.user(id).patch(user, where);
  }

  @del('/user-documents/{id}/user', {
    responses: {
      '200': {
        description: 'UserDocument.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.userDocumentRepository.user(id).delete(where);
  }
}
