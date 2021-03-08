import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import CategoriaEntity from '../entity';

@EntityRepository(CategoriaEntity)
class CategoriaRespository extends Repository<CategoriaEntity> {}

export default CategoriaRespository;

export function getCategoriaRespository() {
  return getCustomRepository(CategoriaRespository);
}