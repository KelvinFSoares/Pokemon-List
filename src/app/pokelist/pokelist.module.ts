import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, PokemonDetailsComponent],
  imports: [CommonModule, RouterModule],
})
export class PokelistModule {}
