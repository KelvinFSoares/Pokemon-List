import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../interface/pokemon';
import { checkIDIsValid } from 'src/app/utils/utils';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription = new Subscription();
  selectedPokemon: Pokemon | undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const ID = params['id'];
      if (!checkIDIsValid(ID)) {
        this.selectedPokemon = undefined;
      } else {
        this.pokemonService
          .getPokemonById({ pokeID: Number(params['id']) })
          .subscribe((res) => {
            if (res) this.selectedPokemon = res;
          });
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
