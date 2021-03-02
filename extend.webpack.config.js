const { GuessPlugin } = require('guess-webpack');
const { parseRoutes } = require('guess-parser');

module.exports = {
  plugins: [
    new GuessPlugin({
      // Alternatively you can provide a Google Analytics View ID
      GA: 'G-84G7HRBCC8  ',
     /*   reportProvider() {
     //     return Promise.resolve(JSON.parse(require('fs').readFileSync('./routes.json')));
     */   },
      runtime: {
        delegate: false
      },
      routeProvider() {
        return parseRoutes('.');
      }
    })
  ]
};