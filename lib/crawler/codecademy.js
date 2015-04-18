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
        var url = 'http://www.codecademy.com' + $(this).find('a.link--target').attr('href');
        result.push({
          'track': track,
          'url': url 
        });
      });
      return cb(null, result);
    });
}

