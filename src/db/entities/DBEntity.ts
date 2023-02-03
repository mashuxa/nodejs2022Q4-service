export class DBEntity<Entity extends { id: string }> {
  protected entities: Entity[] = [];

  findAll(): Entity[] {
    return this.entities;
  }

  findById(id: string): Entity | undefined {
    return this.entities.find((entity) => entity.id === id);
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

  remove(id: string): void {
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }
}
