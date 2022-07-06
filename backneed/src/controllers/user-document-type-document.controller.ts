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
  TypeDocument,
} from '../models';
import {UserDocumentRepository} from '../repositories';

export class UserDocumentTypeDocumentController {
  constructor(
    @repository(UserDocumentRepository) protected userDocumentRepository: UserDocumentRepository,
  ) { }

  @get('/user-documents/{id}/type-document', {
    responses: {
      '200': {
        description: 'UserDocument has one TypeDocument',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TypeDocument),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TypeDocument>,
  ): Promise<TypeDocument> {
    return this.userDocumentRepository.typeDocument(id).get(filter);
  }

  @post('/user-documents/{id}/type-document', {
    responses: {
      '200': {
        description: 'UserDocument model instance',
        content: {'application/json': {schema: getModelSchemaRef(TypeDocument)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof UserDocument.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocument, {
            title: 'NewTypeDocumentInUserDocument',
            exclude: ['id'],
            optional: ['userDocumentId']
          }),
        },
      },
    }) typeDocument: Omit<TypeDocument, 'id'>,
  ): Promise<TypeDocument> {
    return this.userDocumentRepository.typeDocument(id).create(typeDocument);
  }

  @patch('/user-documents/{id}/type-document', {
    responses: {
      '200': {
        description: 'UserDocument.TypeDocument PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypeDocument, {partial: true}),
        },
      },
    })
    typeDocument: Partial<TypeDocument>,
    @param.query.object('where', getWhereSchemaFor(TypeDocument)) where?: Where<TypeDocument>,
  ): Promise<Count> {
    return this.userDocumentRepository.typeDocument(id).patch(typeDocument, where);
  }

  @del('/user-documents/{id}/type-document', {
    responses: {
      '200': {
        description: 'UserDocument.TypeDocument DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TypeDocument)) where?: Where<TypeDocument>,
  ): Promise<Count> {
    return this.userDocumentRepository.typeDocument(id).delete(where);
  }
}
