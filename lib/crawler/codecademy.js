var request = require('superagent');
var cheerio = require('cheerio');

module.exports = function(url, cb) {
  request
    .get(url)
    .end(function(err, res) {
      if (res.status != 200) {
        return cb(new Error('Internal Server Error'));
      }
      var $ = cheerio.load(res.text)
      var result = [];
      $('.completed').each(function(i, element) {
        var track = $(this).find('h5').text();
        result.push({
          'track': track,
        });
      });
      return cb(null, result);
    });
}

