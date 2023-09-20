import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonService } from '../../service/pokemon.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FAKE_POKEMONS } from 'src/app/utils/fakeData';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PokemonService],
      declarations: [PokemonDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Pokemon Details');
  });

  it('should render not found message if selectedPokemon is undefined', () => {
    component.selectedPokemon = undefined;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.innerHTML).toBe('Pokemon Not Found');
  });

  it('should render pokemon all infos', () => {
    component.selectedPokemon = FAKE_POKEMONS[0];
    fixture.detectChanges();

    const nameDIV =
      fixture.debugElement.nativeElement.querySelector('#pokemon-name');
    const weightElement = fixture.debugElement.nativeElement.querySelector(
      '#pokemon-weight-height'
    );
    const statsTitleElement = fixture.debugElement.query(
      By.css('h4')
    ).nativeElement;

    expect(component.selectedPokemon).toBe(FAKE_POKEMONS[0]);
    expect(nameDIV.textContent).toBe(`Name: ${FAKE_POKEMONS[0].name}`);
    expect(weightElement.textContent).toBe(
      `Weight: ${FAKE_POKEMONS[0].weight} / Height: ${FAKE_POKEMONS[0].height}`
    );
    expect(statsTitleElement.textContent).toBe('Stats:');
  });
});
