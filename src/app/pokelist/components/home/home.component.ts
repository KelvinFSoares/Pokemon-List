import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonService } from '../../service/pokemon.service';
import { Pokemon } from '../../interface/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private getPokemonsSub: Subscription = new Subscription();
  pokemonsList: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.getPokemonList$.subscribe(
      (list) => (this.pokemonsList = list)
    );
  }

  ngOnInit() {
    if (this.pokemonsList.length === 0) {
      this.loadInitialData();
    }
  }

  public loadInitialData() {
    this.pokemonService.loadMorePokemons();
  }

  public loadMore() {
    this.pokemonService.loadMorePokemons();
  }

  ngOnDestroy(): void {
    this.getPokemonsSub.unsubscribe();
  }
}
