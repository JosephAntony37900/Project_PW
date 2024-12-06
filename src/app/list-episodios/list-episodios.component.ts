import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../service/service';

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

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.loadAllEpisodes();
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

  showFavorites(): void {
    this.displayedEpisodes = this.favorites;
  }

  toggleFavorite(episode: any): void {
    const isFavorite = this.isFavorite(episode);
    if (isFavorite) {
      this.favorites = this.favorites.filter((fav) => fav.id !== episode.id);
    } else {
      this.favorites.push(episode);
    }
  }

  isFavorite(episode: any): boolean {
    return this.favorites.some((fav) => fav.id === episode.id);
  }
}
