const fs = require('fs');
const path = require('path');

class HublClean {
  apply(compiler) {
    compiler.hooks.done.tap("HublClean", (item) => {
      function searchRecursive(dir, pattern) {
        // This is where we store pattern matches of all files inside the directory
        var results = [];
        // Read contents of directory
        fs.readdirSync(dir).forEach(function (dirInner) {
          // Obtain absolute path
          dirInner = path.resolve(dir, dirInner);
          // Get stats to determine if path is a directory or a file
          var stat = fs.statSync(dirInner);
          // If path is a directory, scan it and combine results
          if (stat.isDirectory()) {
            results = results.concat(searchRecursive(dirInner, pattern));
          }
          // If path is a file and ends with pattern then push it onto results
          if (stat.isFile() && dirInner.endsWith(pattern)) {
            results.push(dirInner);
          }
        });

        return results;
      };

      function removeHublComment(path) {

        // Split path name after dist
        var relPath = path.split("/dist/")

        // add dist to path
        relPath = "./dist/" + relPath[1];

        // Read file
        var data = fs.readFileSync(relPath, "utf-8");

        // Remove all comment keys from start and end 
        // /*~| and |~*/
        var newData = data.replace(/(\/\*\~\|)/g, "")
        newData = newData.replace(/(\|\~\*\/)/g, "")

        // Save new file with the same name
        fs.writeFileSync(relPath, newData, "utf-8");
      }

      // Find all of the files in the dist folder 
      // that have the .css extension
      var files = searchRecursive('./dist', '.css');

      // Remove all of the comments surrounding hubl
      files.forEach(path => {
        removeHublComment(path);
      })
    })

  }


}
module.exports = HublClean