import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrls: ['./list-favorites.component.css']
})
export class ListFavoritesComponent {
  @Input() favorites: any[] = [];
}
