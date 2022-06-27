// eslint-disable-next-line import/prefer-default-export
export class InvalidFile extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, InvalidFile.prototype);
  }
}
