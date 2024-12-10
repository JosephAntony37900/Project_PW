import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../service/service';
import { RickService } from '../service/rick.service';
import { FavoriteService } from '../service/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-episodios',
  templateUrl: './list-episodios.component.html',
  styleUrls: ['./list-episodios.component.css'],
})
export class ListEpisodiosComponent implements OnInit {
  episodes: any[] = [];
  favorites: any[] = [];
  displayedEpisodes: any[] = [];
  isLoading: boolean = true;
  characters: any[] = []; 
  showModal: boolean = false; 
  selectedCharacter: any = null;
  showFavoritesTable: boolean = false;


  constructor(private episodeService: EpisodeService, public favoriteService: FavoriteService, private router: Router, private rickService: RickService ) {}

  ngOnInit(): void {
    this.loadAllEpisodes();
    this.favorites = this.favoriteService.getFavorites();
  }

  loadAllEpisodes(): void {
    const currentPage = 'https://rickandmortyapi.com/api/episode';
    const fetchEpisodes = (url: string): void => {
      this.episodeService.getEpisodes(url).subscribe({
        next: (data) => {
          this.episodes = [...this.episodes, ...data.results];
          this.displayedEpisodes = this.episodes;
          if (data.info.next) {
            fetchEpisodes(data.info.next);
          } else {
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('Error al cargar episodios:', err);
          this.isLoading = false;
        },
      });
    };

    fetchEpisodes(currentPage);
  }

  showEpisodes(): void {
    this.displayedEpisodes = this.episodes;
  }



  toggleFavorite(episode: any): void {
    const isFavorite = this.favoriteService.isFavorite(episode);
    if (isFavorite) {
      this.favoriteService.removeFavorite(episode);
    } else {
      this.favoriteService.addFavorite(episode);
    }
    this.favorites = this.favoriteService.getFavorites();
  }

  viewCharactersByEpisode(episodeId: number): void {
    this.router.navigate(['/add-favorite', { episodeId }]);
  }
  goToCharacters(episodeId: number): void {
    this.router.navigate([`/personajes`, episodeId]);
  }
  goToFavoriteCharacters(episodeId: number): void {
    this.router.navigate([`/personajes-favoritos`, episodeId]); 
  }
  toggleTable(): void {
    this.showFavoritesTable = !this.showFavoritesTable;
  }
}
