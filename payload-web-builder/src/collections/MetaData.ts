import { CollectionConfig } from 'payload/types'
import { Keywords } from '../constants';

const MetaData: CollectionConfig = {
  slug: 'MetaData',
  admin: {
        group: { en: 'Metadata Management', ko: 'Metadata 관리' },
        useAsTitle: 'title',
        defaultColumns: [ 'title', 'description', 'keywords', 'viewport', 'openGraph' ],
        listSearchableFields: [],
        disableDuplicate: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { en: 'title', ko: '제목' },
    },
    {
      name: 'description',
      type: 'text',
      label: { en: 'description', ko: 'description' },
    },
    {
      name: 'keywords',
      type: 'select',
      hasMany: true,
      label: { en: 'keywords', ko: 'keywords' },
      options: [
          {
              label: { en: 'example', ko: 'example' },
              value: Keywords.example,
          },
          {
              label: { en: 'web', ko: 'web' },
              value: Keywords.web,
          },
          {
              label: { en: 'page', ko: 'page' },
              value: Keywords.page,
          },
      ],
    },
    {
      name: 'viewport',
      type: 'text',
      label: { en: 'viewport', ko: 'viewport' },
    },
    {
      name: 'openGraph',
      type: 'group',
      label: { en: 'openGraph', ko: 'openGraph' },
      fields: [
          {
              name: 'type',
              type: 'text',
          },
          {
              name: 'title',
              type: 'text',
          },
          {
              name: 'description',
              type: 'text',
          },
          {
            name: 'openGraphImage',
            type: 'text',
          },
      ],
  },
  ],
}

export default MetaData
