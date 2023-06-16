import { isEmpty, isArray, omitBy, pick } from 'lodash-es';
import { defineStore } from 'pinia';
import { fetchEntity } from '@/webservices/entitiesWebservice';
import { useEntities as entitiesStore } from './entities';
import { mapCategory } from '@/helpers/categoryHelper';
import { translate } from '@/helpers/languageHelper';
import { extractId } from '@/helpers/urlHelper';
import { useUI as uiStore } from './ui';
import { CATEGORY_VALUES } from '../constants/categories';

const ENTITY_FIELDS = [
  ...CATEGORY_VALUES,
  'characters',
  'homeworld',
  'residents',
  'pilots',
];

export const useEntity = defineStore('entity', {
  state: () => ({
    entity: {},
  }),
  actions: {
    async fetchEntity(category, id) {
      try {
        uiStore().setLoading(true);

        const entities = entitiesStore()[category]?.data || [];
        let data = {};

        if (entities.length) {
          // Find and return entity data if already fetched in store
          data = entities.find(e => {
            return extractId(e[translate('url')]) === id;
          });
        }

        if (isEmpty(data)) {
          data = await fetchEntity(category, id);
        }

        /**
         * Populate related entities
         *
         * Related entities
         * (e.g. 'homeworld' in a people entity refers to a `planet` entity)
         */
        data.populatedData = await this.populateEntities(data);

        this.entity = data;
      } catch (e) {
        uiStore().showSnackbar({
          color: 'error',
          message: 'There was an error in fetching this entity.',
        });
      } finally {
        uiStore().setLoading(false);
      }
    },
    // Populate related entities by fetching
    async populateEntities(data) {
      /**
       * We want to get the field and it's corresponding category
       * so we know which endpoint to call regardless if it's in Wookiee
       * */
      const MAPPED_FIELD_CATEGORY = ENTITY_FIELDS.map(field => ({
        category: mapCategory(field),
        field: translate(field),
      }));

      const entityFields = MAPPED_FIELD_CATEGORY.map(m => m.field);

      const dataToBePopulated = omitBy(pick(data, entityFields), isEmpty);
      let populatedData = {};

      // The callback function needs to be awaited
      await Promise.all(
        Object.keys(dataToBePopulated).map(async field => {
          const urlValue = dataToBePopulated[field];

          /**
           * This identifies the category to use for the `fetchEntity` webservice
           */
          const getCategory = fieldToEvaluate => {
            return MAPPED_FIELD_CATEGORY.find(
              fc => fc.field === fieldToEvaluate
            ).category;
          };

          // Checks if there are multiple urls
          if (isArray(urlValue)) {
            // Fetches all and adds it to a field in the populated data
            const promises = urlValue.map(url =>
              fetchEntity(getCategory(field), extractId(url))
            );

            populatedData[field] = await Promise.all(promises);
          } else {
            populatedData[field] = await fetchEntity(
              getCategory(field),
              extractId(urlValue)
            );
          }
        })
      );

      return populatedData;
    },
  },
});
