import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonService } from '../../service/pokemon.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: PokemonService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [PokemonService],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(PokemonService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render h1 title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('Pokemons List');
  });

  it('should render no pokemon cards if pokemonList is empty', () => {
    const listContainerDIV =
      fixture.debugElement.nativeElement.querySelector('#list-container');
    expect(listContainerDIV.length).toBe(undefined);
  });

  it('should render pokemon cards', () => {
    const limit = service.getItemsPerLoad();
    const flagList: boolean[] = [];
    const truthyList: boolean[] = [];
    component.loadInitialData();

    // check if 9 divs (limit number) of pokemons cards is rendered
    Array.from({ length: limit }).map((_, i) => {
      const cardDIV = fixture.debugElement.nativeElement.querySelector(
        `#card-id-${i}`
      );
      flagList.push(cardDIV !== undefined);
      truthyList.push(true);
    });

    expect(flagList).toEqual(truthyList);
  });

  it('should call loadMore function if button is clicked', () => {
    const spySubscribable = spyOn(component, 'loadMore');

    const buttonLoadMore =
      fixture.debugElement.nativeElement.querySelector(`#btn-load-more`);
    buttonLoadMore.click();

    expect(spySubscribable).toHaveBeenCalled();
  });
});
