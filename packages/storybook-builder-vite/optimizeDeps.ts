import * as path from 'path';
import { normalizePath } from 'vite';
import { listStories } from './list-stories';

import type { ExtendedOptions } from './types';

export async function getOptimizeDeps(root: string, options: ExtendedOptions) {
  const absoluteStories = await listStories(options);
  const stories = absoluteStories.map((storyPath) => normalizePath(path.relative(root, storyPath)));

  return {
    // We don't need to resolve the glob since vite supports globs for entries.
    entries: stories,
    // We need Vite to precompile these dependencies, because they contain non-ESM code that would break
    // if we served it directly to the browser.
    include: [
      '@base2/pretty-print-object',
      '@emotion/core',
      '@emotion/is-prop-valid',
      '@emotion/styled',
      '@mdx-js/react',
      '@storybook/addons',
      '@storybook/addon-docs',
      '@storybook/channel-postmessage',
      '@storybook/channel-websocket',
      '@storybook/client-api',
      '@storybook/client-logger',
      '@storybook/core/client',
      '@storybook/csf',
      '@storybook/preview-web',
      '@storybook/react',
      '@storybook/svelte',
      '@storybook/vue3',
      'acorn-jsx',
      'acorn-walk',
      'acorn',
      'airbnb-js-shims',
      'ansi-to-html',
      'axe-core',
      'color-convert',
      'deep-object-diff',
      'doctrine',
      'emotion-theming',
      'escodegen',
      'estraverse',
      'fast-deep-equal',
      'global',
      'html-tags',
      'isobject',
      'loader-utils',
      'lodash/cloneDeep',
      'lodash/isFunction',
      'lodash/isPlainObject',
      'lodash/isString',
      'lodash/mapKeys',
      'lodash/mapValues',
      'lodash/pick',
      'lodash/pickBy',
      'lodash/startCase',
      'lodash/throttle',
      'lodash/uniq',
      'markdown-to-jsx',
      'memoizerific',
      'overlayscrollbars',
      'polished',
      'prettier/parser-babel',
      'prettier/parser-flow',
      'prettier/parser-typescript',
      'prop-types',
      'qs',
      'react-dom',
      'react-fast-compare',
      'react-is',
      'react-textarea-autosize',
      'react',
      'refractor/core',
      'refractor/lang/bash.js',
      'refractor/lang/css.js',
      'refractor/lang/graphql.js',
      'refractor/lang/js-extras.js',
      'refractor/lang/json.js',
      'refractor/lang/jsx.js',
      'refractor/lang/markdown.js',
      'refractor/lang/markup.js',
      'refractor/lang/tsx.js',
      'refractor/lang/typescript.js',
      'refractor/lang/yaml.js',
      'regenerator-runtime/runtime.js',
      'slash',
      'stable',
      'store2',
      'synchronous-promise',
      'telejson',
      'ts-dedent',
      'util-deprecate',
      'uuid-browser/v4',
      'unfetch',
      'vue',
      'warning',
    ].filter((m) => {
      try {
        require.resolve(m);
        return true;
      } catch (err) {
        return false;
      }
    }),
  };
}
