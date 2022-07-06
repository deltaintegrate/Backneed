import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TypeDocument,
  UserDocument,
} from '../models';
import {TypeDocumentRepository} from '../repositories';

export class TypeDocumentUserDocumentController {
  constructor(
    @repository(TypeDocumentRepository)
    public typeDocumentRepository: TypeDocumentRepository,
  ) { }

  @get('/type-documents/{id}/user-document', {
    responses: {
      '200': {
        description: 'UserDocument belonging to TypeDocument',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserDocument)},
          },
        },
      },
    },
  })
  async getUserDocument(
    @param.path.number('id') id: typeof TypeDocument.prototype.id,
  ): Promise<UserDocument> {
    return this.typeDocumentRepository.userDocument(id);
  }
}
