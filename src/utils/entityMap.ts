import {
  EntityAlreadyExists,
  EntityNotFound,
  InvalidEntity,
} from './exceptions';

export default class EntityMap<EntityType> {
  private key: string;

  private keys: string[];

  private entities: Record<string, EntityType>;

  constructor(array?: EntityType[], key = 'id') {
    this.key = key;
    this.entities = {};
    this.keys =
      array?.map(entity => {
        if (!entity[key]) {
          throw new Error(`key '${key}' does not exist in entity`);
        }
        this.entities[entity[key]] = entity;
        return entity[key];
      }) ?? [];
  }

  get count() {
    return this.keys.length;
  }

  toArray(): EntityType[] {
    return this.keys.map(key => this.entities[key]);
  }

  get(entityKey: string): EntityType {
    return this.entities[entityKey];
  }

  at(index: number): EntityType {
    return this.entities[this.keys[index] ?? ''];
  }

  indexOf(entityKey: string): number {
    return this.keys.indexOf(entityKey);
  }

  add(entity: EntityType): EntityMap<EntityType> {
    const key = entity[this.key];
    if (!key) {
      throw new InvalidEntity(`Entity is missing '${this.key}' key`);
    }
    if (this.entities[key]) {
      throw new EntityAlreadyExists(`Entity with key '${key}' already exists`);
    }
    this.keys.push(key);
    this.entities[key] = entity;
    return this;
  }

  update(entity: EntityType): EntityMap<EntityType> {
    const key = entity[this.key];
    if (!key) {
      throw new InvalidEntity(`Entity is missing '${this.key}' key`);
    }
    if (!this.entities[key]) {
      throw new EntityNotFound(`Entity with key '${key}' not found`);
    }
    this.entities[key] = entity;
    return this;
  }

  remove(entityKey: string): EntityMap<EntityType> {
    if (!this.entities[entityKey]) {
      throw new EntityNotFound(`Entity with key '${entityKey}' not found`);
    }
    delete this.entities[entityKey];
    this.keys.splice(this.indexOf(entityKey), 1);
    return this;
  }
}
