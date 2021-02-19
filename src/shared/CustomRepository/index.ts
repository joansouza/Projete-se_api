import {
  EntityRepository,
  Repository,
  EntityManager,
  ObjectLiteral,
  EntityTarget,
} from 'typeorm';

@EntityRepository()
class CustomRepository<Entity extends ObjectLiteral> {
  #repository: Repository<Entity>;

  public get repository() {
    return this.#repository;
  }

  constructor(private manager: EntityManager, entity: EntityTarget<Entity>) {
    this.#repository = this.manager.getRepository(entity);
  }
}

export default CustomRepository;
