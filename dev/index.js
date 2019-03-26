import './bootstrap';
import { init, registerWidget } from 'netlify-cms';
import 'netlify-cms/dist/cms.css';
import { InlineSelectControl, InlineSelectPreview } from '../src';

const config = {
  backend: {
    name: 'test-repo',
    login: false,
  },
  media_folder: 'assets',
  collections: [
    {
      name: 'test',
      label: 'Test',
      files: [
        {
          file: 'test.yml',
          name: 'test',
          label: 'Test',
          fields: [
            {
              name: 'radio',
              label: 'Inline radio select',
              widget: 'inline-select',
              options: ['left', 'center', 'right'],
            },
            {
              name: 'select',
              label: 'Inline multiple checkbox select',
              widget: 'inline-select',
              multiple: true,
              options: [
                {
                  label: 'React',
                  value: 'react',
                },
                {
                  label: 'Preact',
                  value: 'preact',
                },
                {
                  label: 'Angular 1.x',
                  value: 'angular',
                },
                {
                  label: 'Modern Angular',
                  value: 'angular-js',
                },
                {
                  label: 'Vue.js',
                  value: 'vue',
                },
                {
                  label: 'jQuery',
                  value: '$',
                },
                {
                  label: 'Backbone',
                  value: 'backbone',
                },
              ],
            },
            {
              name: 'radio_2',
              label: 'Inline radio select with long titles',
              widget: 'inline-select',
              options: [
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                'looooooooooooooooooooooooooooooooooooooooooooooooong selection',
              ],
            },
          ],
        },
      ],
    },
  ],
};

registerWidget('inline-select', InlineSelectControl, InlineSelectPreview);

init({ config });
