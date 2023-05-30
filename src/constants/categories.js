export const CATEGORY_VALUE = {
  planets: 'planets',
  people: 'people',
  films: 'films',
  starships: 'starships',
  vehicles: 'vehicles',
  species: 'species',
}

export const CATEGORIES = [
  { text: 'Planets', value: CATEGORY_VALUE.planets },
  { text: 'People', value: CATEGORY_VALUE.people },
  { text: 'Films', value: CATEGORY_VALUE.films },
  { text: 'Starships', value: CATEGORY_VALUE.starships },
  { text: 'Vehicles', value: CATEGORY_VALUE.vehicles },
  { text: 'Species', value: CATEGORY_VALUE.species },
]

export const CATEGORY_VALUES = CATEGORIES.map(category => category.value)