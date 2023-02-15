import { Program } from 'services/epg';
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
    const targetIndex = this.keys.indexOf(target ?? '');
    if (targetIndex !== -1) {
      this.keys.splice(targetIndex, 0, key);
    } else {
      this.keys.push(key);
    }
    this.entities[key] = entity;
    return this;
  }

  updateProgram(entity: EntityType): EntityMap<EntityType> {
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

  // eslint-disable-next-line class-methods-use-this
  updateMany(
    entity: Program,
    programs: EntityMap<Program>,
    selected: Set<string>,
    fields: boolean[],
  ): EntityMap<Program> {
    Array.from(selected).forEach(id => {
      const oldProgram = programs.get(id);
      const newProgram = new Program({
        id: oldProgram?.id,
        startDateTime: oldProgram?.startDateTime,
        duration: oldProgram?.duration,
        title: fields[0] ? entity.title : oldProgram?.title,
        description: fields[1] ? entity.description : oldProgram?.description,
        rating: fields[2] ? entity.rating : oldProgram?.rating,
        content: fields[3] ? entity.content : oldProgram?.content,
        category: fields[4] ? entity.category : oldProgram?.category,
        subcategory: fields[4] ? entity.subcategory : oldProgram?.subcategory,
      });
      programs.updateProgram(newProgram);
    });
    return programs;
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
    if (!this.entities[entityKey]) {
      throw new EntityNotFound(`Entity with key '${entityKey}' not found`);
    }
    if (targetKey && !this.entities[targetKey]) {
      throw new EntityNotFound(`Entity with key '${targetKey}' not found`);
    }
    const sourceIndex = this.keys.indexOf(entityKey);
    let targetIndex = this.keys.length;
    if (targetKey) {
      targetIndex = this.keys.indexOf(targetKey);
    }
    this.keys.splice(sourceIndex, 1);
    this.keys.splice(targetIndex, 0, entityKey);
    return this;
  }
}
