import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

await register(StyleDictionary, {
  excludeParentKeys: false
});

export default {
  source: ['tokens/**/*.json', '!tokens/**/$*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    cssApp: {
      transformGroup: 'tokens-studio',
      buildPath: 'app/assets/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    },
    cssRoot: {
      transformGroup: 'tokens-studio',
      buildPath: 'assets/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true
          }
        }
      ]
    }
  }
};