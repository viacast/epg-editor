/* eslint-disable max-classes-per-file */
export class InvalidFile extends Error {
  constructor(m?: string) {
    super(m ?? 'invalid file');
    Object.setPrototypeOf(this, InvalidFile.prototype);
  }
}

export class InvalidEntity extends Error {
  constructor(m?: string) {
    super(m ?? 'invalid entity');
    Object.setPrototypeOf(this, InvalidEntity.prototype);
  }
}

export class EntityAlreadyExists extends Error {
  constructor(m?: string) {
    super(m ?? 'entity already exists');
    Object.setPrototypeOf(this, InvalidEntity.prototype);
  }
}

export class EntityNotFound extends Error {
  constructor(m?: string) {
    super(m ?? 'entity already exists');
    Object.setPrototypeOf(this, InvalidEntity.prototype);
  }
}
