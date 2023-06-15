import { CATEGORY_VALUE } from '@/constants/categories';

// Values are the attribute/field names
export const ENTITY_CARD_CONTENT = {
  [CATEGORY_VALUE.people]: {
    title: 'name',
    contentFields: ['birth_year', 'gender'],
  },
  [CATEGORY_VALUE.planets]: {
    title: 'name',
    contentFields: ['terrain', 'population'],
  },
  [CATEGORY_VALUE.films]: {
    title: 'title',
    contentFields: ['director', 'release_date'],
  },
  [CATEGORY_VALUE.starships]: {
    title: 'name',
    contentFields: ['manufacturer', 'cost_in_credits'],
  },
  [CATEGORY_VALUE.vehicles]: {
    title: 'name',
    contentFields: ['manufacturer', 'cost_in_credits'],
  },
  [CATEGORY_VALUE.species]: {
    title: 'name',
    contentFields: ['classification', 'designation'],
  },
};
