/**
 * A rollup plugin to remove comment tokens added by postcss-hubl.
 *
 * https://github.com/spingroup/postcss-hubl
 */
export default function HublPostCSSCleaner () {
  return {
    name: 'hubl-cleaner', // this name will show up in logs and errors
    transform(source, id) {
      // Remove all comment keys from start and end
      // /*~| and |~*/
      return source.replace(/(\/\*\~\|)/g, "").replace(/(\|\~\*\/)/g, "")
    },
  };
}
