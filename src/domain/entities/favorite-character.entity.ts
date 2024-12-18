export class FavoriteCharacter {
  constructor(
    public readonly id?: string,
    public readonly nombre?: string,
    public readonly planeta?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
