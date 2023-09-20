export const FAKE_POKEMONS = [
  {
    id: 1,
    name: 'fake_pokemon_1',
    height: 1,
    weight: 1,
    sprites: {
      front_default: 'front_default_example.png',
      back_default: 'back_default_example.png',
    },
    stats: [
      {
        base_stat: 50,
        stat: {
          name: 'attack',
          url: 'url_example',
        },
      },
      {
        base_stat: 60,
        stat: {
          name: 'defense',
          url: 'url_example',
        },
      },
    ],
  },
  {
    id: 2,
    name: 'fake_pokemon_2',
    height: 2,
    weight: 2,
    sprites: {
      front_default: 'string',
      back_default: 'string',
    },
    stats: [],
  },
  {
    id: 3,
    name: 'fake_pokemon_3',
    height: 3,
    weight: 3,
    sprites: {
      front_default: 'string',
      back_default: 'string',
    },
    stats: [],
  },
];
