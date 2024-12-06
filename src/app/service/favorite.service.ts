import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: any[] = [];

  getFavorites(): any[] {
    return this.favorites;
  }

  addFavorite(item: any): void {
    const exists = this.favorites.some((fav) => fav.id === item.id);
    if (!exists) {
      this.favorites.push(item);
    }
  }

  removeFavorite(item: any): void {
    this.favorites = this.favorites.filter((fav) => fav.id !== item.id);
  }

  isFavorite(item: any): boolean {
    return this.favorites.some((fav) => fav.id === item.id);
  }
}
