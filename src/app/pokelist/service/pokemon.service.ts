import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interface/pokemon';
import { transformRawPokermonData } from 'src/app/utils/transformer';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  private currentOffset = 1;
  private itemsPerLoad = 9;
  private dataArray: BehaviorSubject<Pokemon[]> = new BehaviorSubject<
    Pokemon[]
  >([]);
  getPokemonList$: Observable<Pokemon[]> = this.dataArray.asObservable();

  setPokemonList(newList: Pokemon[]): void {
    this.dataArray.next(newList);
  }

  setOffset(newOffset: number): void {
    this.currentOffset = newOffset;
  }

  setItemsPerLoad(newLimit: number): void {
    this.itemsPerLoad = newLimit;
  }

  getOffsetNumber(): number {
    return this.currentOffset;
  }

  getItemsPerLoad(): number {
    return this.itemsPerLoad;
  }

  fetchAPIPokemons(query: FetchPokemonsQuery): Observable<Pokemon[]> {
    const { limit, offset } = query;

    return forkJoin(
      Array.from({ length: limit }).map((_, i) =>
        this.httpClient
          .get(`https://pokeapi.co/api/v2/pokemon/${i + offset}/`)
          .pipe(map((response) => transformRawPokermonData(response)))
      )
    );
  }

  getPokemonById(
    query: FetchPokemonByIDQuery
  ): Observable<Pokemon | undefined> {
    const { pokeID } = query;

    return this.getPokemonList$.pipe(
      map((pokemons) => {
        return pokemons.find((pokemon) => pokemon.id === pokeID);
      })
    );
  }

  loadMorePokemons(): void {
    forkJoin([
      this.getPokemonList$.pipe(take(1)),
      this.fetchAPIPokemons({
        limit: this.itemsPerLoad,
        offset: this.currentOffset,
      }),
    ]).subscribe((data: Array<Array<Pokemon>>) => {
      const newArr = [...data[0], ...data[1]];
      this.setPokemonList(newArr);

      this.currentOffset += this.itemsPerLoad;
    });
  }
}

export interface FetchPokemonsQuery {
  offset: number;
  limit: number;
}

export interface FetchPokemonByIDQuery {
  pokeID: number;
}
