import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../interface/pokemon';
import { FAKE_POKEMONS } from 'src/app/utils/fakeData';

describe('PokemonService', () => {
  let service: PokemonService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService],
    });
    service = TestBed.inject(PokemonService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the request Offset', () => {
    const initialOffset = 1;
    expect(service.getOffsetNumber()).toBe(initialOffset);
  });

  it('should set the request Offset', () => {
    const newOffset = 10;
    service.setOffset(newOffset);
    expect(service.getOffsetNumber()).toBe(newOffset);
  });

  it('should return the request Limit', () => {
    const initialLimit = 9;
    expect(service.getItemsPerLoad()).toBe(initialLimit);
  });

  it('should set the request Limit', () => {
    const newLimit = 20;
    service.setOffset(newLimit);
    expect(service.getOffsetNumber()).toBe(newLimit);
  });

  it('should initially return the empty Pokemons List', () => {
    let initialPokemons: Pokemon[] | undefined;
    service.getPokemonList$
      .subscribe((list) => {
        initialPokemons = list;
      })
      .unsubscribe();
    expect(initialPokemons).toEqual([]);
  });

  it('should fetch pokemons via requests to pokeapi', () => {
    const offset = service.getOffsetNumber();
    const limit = service.getItemsPerLoad();
    const expectedPokemonList = [
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
      FAKE_POKEMONS[0],
    ];
    const expectedUrlList: string[] = [];
    let request;

    Array.from({ length: limit }).map((_, i) =>
      expectedUrlList.push(`https://pokeapi.co/api/v2/pokemon/${i + offset}/`)
    );

    service
      .fetchAPIPokemons({ limit: limit, offset: offset })
      .subscribe((list) => {
        expect(list).toHaveSize(9);
        expect(list).toEqual(expectedPokemonList);
      });

    Array.from({ length: limit }).map((_, i) => {
      request = controller.expectOne(expectedUrlList[i]);
      request.flush(FAKE_POKEMONS[0]);
    });
  });

  it('should get pokemon by ID from pokemonList', () => {
    service.setItemsPerLoad(3);
    const offset = service.getOffsetNumber();
    const limit = service.getItemsPerLoad();

    const expectedUrlList: string[] = [];
    let request;

    Array.from({ length: limit }).map((_, i) =>
      expectedUrlList.push(`https://pokeapi.co/api/v2/pokemon/${i + offset}/`)
    );

    service
      .fetchAPIPokemons({ limit: limit, offset: offset })
      .subscribe((list) => {
        expect(list).toHaveSize(3);
        service.setPokemonList(list);
      });

    Array.from({ length: limit }).map((_, i) => {
      request = controller.expectOne(expectedUrlList[i]);
      request.flush(FAKE_POKEMONS[i]);
    });

    service.getPokemonById({ pokeID: 2 }).subscribe((result) => {
      expect(result).toEqual(FAKE_POKEMONS[1]);
    });
  });

  it('should return undefined if no pokemon is found by ID', () => {
    service.setItemsPerLoad(3);
    const offset = service.getOffsetNumber();
    const limit = service.getItemsPerLoad();

    const expectedUrlList: string[] = [];
    let request;

    Array.from({ length: limit }).map((_, i) =>
      expectedUrlList.push(`https://pokeapi.co/api/v2/pokemon/${i + offset}/`)
    );

    service
      .fetchAPIPokemons({ limit: limit, offset: offset })
      .subscribe((list) => {
        expect(list).toHaveSize(3);
        service.setPokemonList(list);
      });

    Array.from({ length: limit }).map((_, i) => {
      request = controller.expectOne(expectedUrlList[i]);
      request.flush(FAKE_POKEMONS[i]);
    });

    service.getPokemonById({ pokeID: 10 }).subscribe((result) => {
      expect(result).toEqual(undefined);
    });
  });
});
