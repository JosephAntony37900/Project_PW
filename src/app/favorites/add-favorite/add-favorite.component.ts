import { Component, OnInit } from '@angular/core';
import { RickService } from '../../service/rick.service';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-favorite',
  templateUrl: './add-favorite.component.html',
  styleUrls: ['./add-favorite.component.css'],
})
export class AddFavoriteComponent implements OnInit {
  characters: any[] = [];
  favorites: any[] = [];
  selectedCharacter: any = null; // Para almacenar el personaje seleccionado
  showModal: boolean = false; // Controla la visibilidad de la modal
  faHeart = faHeart;

  constructor(private rickService: RickService) {}

  ngOnInit(): void {
    this.rickService.getCharacters().subscribe((data) => {
      this.characters = data.results;
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
    if (!this.favorites.some((fav) => fav.id === character.id)) {
      this.favorites.push(character);
      alert(`${character.name} añadido a favoritos.`);
    } else {
      alert(`${character.name} ya está en favoritos.`);
    }
  }
}
