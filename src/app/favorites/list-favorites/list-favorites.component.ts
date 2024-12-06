import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../service/favorite.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.css'],
})
export class ListFavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
  }
}
