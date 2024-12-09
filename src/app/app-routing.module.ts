import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFavoriteComponent } from './favorites/add-favorite/add-favorite.component';
import { ListFavoritesComponent } from './favorites/list-favorites/list-favorites.component';
import { ListEpisodiosComponent } from './list-episodios/list-episodios.component';

const routes: Routes = [
  {path: '', component: ListEpisodiosComponent},
  {path: 'look-characters', component: AddFavoriteComponent},
  {path: 'look-favorites', component: ListFavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }