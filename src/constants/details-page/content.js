import { CATEGORY_VALUE } from '@/constants/categories'

export const SECTIONS = {
  [CATEGORY_VALUE.people]: [
    {
      title: 'Basic Information',
      fields: ['birth_year', 'gender']
    },
    {
      title: 'Characteristics',
      fields: ['height', 'mass', 'hair_color', 'skin_color', 'eye_color']
    }
  ],
  [CATEGORY_VALUE.planets]: [
    {
      title: 'Basic Information',
      fields: ['terrain', 'population', 'climate'],
    },
    {
      title: 'Characteristics',
      fields: ['rotation_period', 'orbital_period', 'diameter', 'gravity', 'surface_water']
    }
  ],
  [CATEGORY_VALUE.films]: [
    {
      title: 'Opening Crawl',
      fields: ['opening_crawl'],
      valueOnly: true
    },
    {
      title: 'Movie Information',
      fields: ['episode_id', 'release_date', 'director', 'producer'],
    }
  ],
  [CATEGORY_VALUE.starships]: [
    {
      title: 'Basic Information',
      fields: ['manufacturer', 'model', 'starship_class', 'cost_in_credits'],
    },
    {
      title: 'Capacity',
      fields: ['crew', 'passengers', 'cargo_capacity', 'consumables'],
    },
    {
      title: 'Characteristics',
      fields: ['length', 'max_atmosphering_speed', 'hyperdrive_rating', 'MGLT']
    },
  ],
  [CATEGORY_VALUE.vehicles]: [
    {
      title: 'Basic Information',
      fields: ['manufacturer', 'model', 'vehicle_class', 'cost_in_credits'],
    },
    {
      title: 'Capacity',
      fields: ['crew', 'passengers', 'cargo_capacity', 'consumables'],
    },
    {
      title: 'Characteristics',
      fields: ['length', 'max_atmosphering_speed'],
    },
  ],
  [CATEGORY_VALUE.species]: [
    {
      title: 'Basic Information',
      fields: ['classification', 'designation', 'language'],
    },
    {
      title: 'Characteristics',
      fields: ['average_height', 'average_lifespan', 'eye_colors', 'hair_colors']
    }
  ]
}


export const DETAILS = {
  [CATEGORY_VALUE.people]: {
    sections: [
      {
        title: 'Basic Information',
        fields: ['birth_year', 'gender']
      },
      {
        title: 'Characteristics',
        fields: ['height', 'mass', 'hair_color', 'skin_color', 'eye_color']
      }
    ],
    relatedEntities: ['homeworld', 'species', 'vehicles', 'starships', 'films']
  }
}