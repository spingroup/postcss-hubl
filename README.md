# postcss-hubl syntax

## Purpose

Allows hubl expressions and hubl statements to be used in their native form in webpack builds.

## What is included?

This is a postcss syntax as specified by the postcss documentation [here](https://github.com/postcss/postcss/blob/main/docs/syntax.md).

It contains 4 main pieces:

- Parser
- Stringifier
- Tokenizer
- hubl-clean plugin or rollup-plugin-hubl-cleaner

All of which are extensions of their respective base postcss counterparts.

## Install
`npm i @spingroup/postcss-hubl`

## Usage

### Add postcss-hubl to postcss
Tell post css to use hubl-parser. During the compile process this will wrap all of your hubl in a special comment. This is necessary to keep valid css so that any other linters and tools that you use in your build process will still work.
**postcss.config.js**
```js {title: postcss.config.js}
const HublParser = require('@spingroup/postcss-hubl/hubl-parse');

module.exports = {
  parser: HublParser,
  plugins: []
};
```

### Use hubl-clean plugin - webpack or vite support

The last step is to add the appropriate `webpack` or `vite` cleanup plugin. This plugin fires after your build tool has finished compiling assets (after your other build tools have finished running) and will remove the comments from your HubL. You can then upload your dist directory to HubSpot.


#### To configure `webpack`:

**webpack.config.js**
```js {title: postcss.config.js}
const HublClean = require('@spingroup/postcss-hubl/hubl-clean');

module.exports = {
  plugins: [
    new HublClean(),
  ]
};
```

#### To configure `vite`:

**vite.config.ts**
```js {title: vite.config.ts}

import HublPostCSSCleaner from '@spingroup/postcss-hubl/rollup-plugin-hubl-cleaner';

export default defineConfig({
  plugins: [
    new HublPostCSSCleaner(),
  ]
  ...
});
```


**Styles.css Input**
```css {title: postcss.config.js}
{% if x %}
.test-selector {
  display: {{module.test_display}};
}

{% endif %}
```

**Styles.css output**
```css {title: postcss.config.js}
/*~| {% if x %} |~*/
.test-selector {
  display: /*~| {{module.test_display}} |~*/;
}
/*~| {% endif %} |~*/
```

**Styles.css output after HublClean**
```css {title: postcss.config.js}
{% if x %}
.test-selector {
  display: {{module.test_display}};
}
{% endif %}
```
