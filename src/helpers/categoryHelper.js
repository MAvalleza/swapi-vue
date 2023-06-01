import { CATEGORY_VALUE } from "@/constants/categories"

const CATEGORY_MAPPER = {
  ...CATEGORY_VALUE,
  characters: 'people',
  homeworld: 'planets',
  residents: 'people',
  pilots: 'people',
}

// Maps a field to the actual category represented
export const mapCategory = (category) => {
  return CATEGORY_MAPPER[category]
}