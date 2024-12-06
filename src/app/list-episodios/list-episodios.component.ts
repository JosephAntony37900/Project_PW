import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../service/service';
import { RickService } from '../service/rick.service'; // Importamos el servicio RickService

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
  characters: any[] = []; // Para almacenar los personajes
  showModal: boolean = false; // Controla la visibilidad del modal
  selectedCharacter: any = null; // Almacena el personaje seleccionado

  constructor(
    private episodeService: EpisodeService,
    private rickService: RickService // Inyectamos el servicio RickService
  ) {}

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

  // Método para obtener los personajes por episodio
  getCharactersByEpisode(episode: any): void {
    this.rickService.getCharactersByEpisode(episode.id).subscribe({
      next: (characters) => {
        this.characters = characters; // Almacenamos los personajes
      },
      error: (err) => {
        console.error('Error al cargar los personajes:', err);
      },
    });
  }

  // Método para abrir el modal con la información del personaje
  openModal(character: any): void {
    this.selectedCharacter = character;
    this.showModal = true; // Mostramos el modal
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.showModal = false;
    this.selectedCharacter = null; // Limpiamos el personaje seleccionado
  }

  // Método para agregar el personaje a los favoritos
  addToFavorites(character: any): void {
    // Lógica para agregar el personaje a los favoritos
    console.log('Añadido a favoritos:', character);
  }
}
