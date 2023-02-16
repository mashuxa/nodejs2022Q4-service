export class DBEntity<Entity extends { id: string }> {
  protected entities: Entity[] = [];

  findAll(): Entity[] {
    return this.entities;
  }

  findById(id: string): Entity | undefined {
    return this.entities.find((entity) => entity.id === id);
  }

  findMany(propName: string, value: string | string[]): Entity[] {
    if (Array.isArray(value)) {
      return this.entities.filter((entity) => value.includes(entity[propName]));
    }

    return this.entities.filter((entity) => entity[propName] === value);
  }

  create(entity: Entity): Entity {
    this.entities.push(entity);

    return entity;
  }

  update(id: string, entity: Omit<Entity, 'id'>): Entity {
    const userIndex = this.entities.findIndex((value) => value.id === id);
    const user = this.entities[userIndex];
    const updatedUser = Object.assign(user, entity);

    this.entities[userIndex] = updatedUser;

    return updatedUser;
  }

  updateMany(entities: Entity[]): Entity[] {
    return entities.map((entity) => {
      const index = this.entities.findIndex(({ id }) => id === entity.id);

      this.entities[index] = Object.assign(this.entities[index], entity);

      return entity;
    });
  }

  remove(id: string): void {
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }
}
