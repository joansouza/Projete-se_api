import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import PropostaEntity from '../entity';

@EntityRepository(PropostaEntity)
class PropostaRespository extends Repository<PropostaEntity> {}

export default PropostaRespository;

export function getCategoriaRespository() {
  return getCustomRepository(PropostaRespository);
}
