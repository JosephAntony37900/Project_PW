import { Component, OnInit } from '@angular/core';
import { RickService } from '../../service/rick.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../../service/favorite.service';

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.css'],
})
export class AddFavoriteComponent implements OnInit {
  characters: any[] = [];
  selectedCharacter: any = null; // Para almacenar el personaje seleccionado
  showModal: boolean = false; // Controla la visibilidad de la modal
  faHeart = faHeart;

  constructor(
    private rickService: RickService,
    private router: Router,
    private route: ActivatedRoute,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const episodeIdParam = params.get('episodeId');
      const episodeId = episodeIdParam ? +episodeIdParam : null;
      if (episodeId) {
        this.loadCharactersByEpisode(episodeId);
      } else {
        this.loadAllCharacters();
      }
    });
  }

  loadAllCharacters(): void {
    this.rickService.getCharacters().subscribe((data) => {
      this.characters = data.results;
    });
  }

  loadCharactersByEpisode(episodeId: number): void {
    this.rickService.getCharactersByEpisode(episodeId).subscribe((characters) => {
      this.characters = characters;
    });
  }

  openModal(character: any): void {
    this.selectedCharacter = character;
    this.showModal = true;
  }

  closeModal(): void {
    this.selectedCharacter = null;
    this.showModal = false;
  }

  addToFavorites(character: any): void {
    this.favoriteService.addFavorite(character);
    alert(`${character.name} añadido a favoritos.`);
    this.closeModal();
    this.router.navigate(['']);
  }
}
