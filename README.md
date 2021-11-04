# postcss-hubl syntax
**This plugin is still in testing phases. Consider it a beta. It will work with most webpack configurations**

## Purpose 

Allows hubl expressions and hubl statements to be used in their native form in webpack builds.

## What is included?

This is a postcss syntax as specified by the postcss documentation [here](https://github.com/postcss/postcss/blob/main/docs/syntax.md). 

It contains 3 main pieces:

- Parser
- Stringifier
- Tokenizer

All of which are extensions of their respective base postcss counterparts.

## Install
`npm i @spingroup/postcss-hubl`

## Usage

**postcss.config.js**
```js {title: postcss.config.js}
const HublParser = require('@spingroup/postcss-hubl/hubl-parse');

module.exports = {
  parser: HublParser,
  plugins: []
};
```

Now you can write native hubl syntax inside of your css files and postcss will recognize it as valid markup. The parser will output the hubl inside of a comment so that any linting and other build tools will not fail. Your Hubl expressions will still run as long as they are not inside of hulb comments `{##}`

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
/* {% if x %} */
.test-selector {
  display: {{module.test_display}};
}
/* {% endif %} */
```
