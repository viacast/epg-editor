import { EntityNotFound, InvalidEntity } from './exceptions';

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

  clone(): EntityMap<EntityType> {
    return new EntityMap(this.toArray());
  }

  toArray(): EntityType[] {
    return this.keys.map(key => this.entities[key]);
  }

  get(entityKey: string): EntityType | undefined {
    return this.entities[entityKey];
  }

  at(index: number): EntityType | undefined {
    return this.entities[this.keys[index] ?? ''];
  }

  indexOf(entityKey: string): number {
    return this.keys.indexOf(entityKey);
  }

  add(
    entity: EntityType | EntityType[],
    target?: string,
  ): EntityMap<EntityType> {
    if (Array.isArray(entity)) {
      entity.forEach(e => this.add(e, target));
      return this;
    }
    const key = entity[this.key];
    if (!key) {
      throw new InvalidEntity(`Entity is missing '${this.key}' key`);
    }
    if (this.entities[key]) {
      return this;
    }
    if (target) {
      this.keys.splice(this.keys.indexOf(target), 0, key);
    } else {
      this.keys.push(key);
    }
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
      return this;
    }
    delete this.entities[entityKey];
    this.keys.splice(this.indexOf(entityKey), 1);
    return this;
  }

  moveTo(entityKey: string, targetKey?: string): EntityMap<EntityType> {
    this.keys.splice(this.keys.indexOf(entityKey), 1);
    this.keys.splice(this.keys.indexOf(targetKey ?? entityKey), 0, entityKey);
    return this;
  }

  moveRelative(
    entityKey: string,
    step: number | 'start' | 'end',
  ): EntityMap<EntityType> {
    let target: number;
    if (step === 'start') {
      target = 0;
    } else if (step === 'end') {
      target = this.keys.length;
    } else {
      target = step;
    }
    this.keys.splice(this.keys.indexOf(entityKey), 1);
    this.keys.splice(target, 0, entityKey);
    return this;
  }
}
