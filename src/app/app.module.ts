import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFavoritesComponent } from './favorites/list-favorites/list-favorites.component';
import { AddFavoriteComponent } from './favorites/add-favorite/add-favorite.component';


import { ListEpisodiosComponent } from './list-episodios/list-episodios.component';
import { PersonajesComponent } from './personajes/personajes.component';
import {HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ListFavoritesComponent,
    AddFavoriteComponent,
    ListEpisodiosComponent,
    PersonajesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,

    HttpClientModule,
    CommonModule
  ],
  providers: [
    provideHttpClient(withFetch()) 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
