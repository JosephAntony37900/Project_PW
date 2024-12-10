import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickService } from '../service/rick.service';
import { FavoriteService } from '../service/favorite.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {
  characters: any[] = [];
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedCharacter: any = null;

  private apiUrl = 'https://rickandmortyapi.com/api';


  constructor(
    private route: ActivatedRoute,
    private rickService: RickService,
    private favoriteService: FavoriteService,
    private location : Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const episodeId = params['episodeId'];
      if (episodeId) {
        if (this.route.snapshot.url[0].path === 'personajes-favoritos') {
          this.getFavoriteCharactersByEpisode(episodeId);
        } else {
          this.getCharactersByEpisode(episodeId);
        }
      }
    });
  }
  

  getCharactersByEpisode(episodeId: number): void {
    this.isLoading = true;
    this.rickService.getCharactersByEpisode(episodeId).subscribe({
      next: (characters) => {
        this.characters = characters;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los personajes:', err);
        this.isLoading = false;
      },
    });
  }

  openModal(character: any): void {
    this.selectedCharacter = character;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCharacter = null;
  }

  addToFavorites(character: any): void {
    this.favoriteService.addFavorite(character);
    console.log(`Añadido a favoritos: ${character.name}`);
  }
  
  getFavoriteCharactersByEpisode(episodeId: number): void {
    this.isLoading = true;
  
    const favoriteCharacters = this.favoriteService.getFavorites().filter((character) =>
      character.episode.includes(`${this.apiUrl}/episode/${episodeId}`)
    );
  
    this.characters = favoriteCharacters;
    this.isLoading = false;
  }
  
}
