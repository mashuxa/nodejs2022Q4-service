export class DBFavorites {
  protected entities: string[] = [];

  findAll(): string[] {
    return this.entities;
  }

  findById(id: string): string {
    return this.entities.find((value) => value === id);
  }

  create(entity: string): string {
    this.entities.push(entity);

    return entity;
  }

  remove(id: string): void {
    this.entities = this.entities.filter((entity) => entity !== id);
  }
}
