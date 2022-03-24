export class GenericType {
  constructor() {
    this.id = undefined;
    this.disabled = false;
  }
}

export class SortableType extends GenericType {
  constructor(...args) {
    super(...args);
    this.sort = 1;
  }
}
