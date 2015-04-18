var request = require('superagent');
var cheerio = require('cheerio');

module.exports = function(username, cb) {
  var url = 'https://github.com/' + username + '?tab=repositories';
  request
    .get(url)
    .end(function(err, res) {
      if (res.status != 200) {
        return cb(new Error('Internal Server Error'));
      }
      var $ = cheerio.load(res.text);
      var result = [];
      $('.repo-tab').each(function(i, element) {
        $(this).find('li.repo-list-item .repo-list-name a').each(function(i, element) {
          var name = $(this).text().trim();
          var url = 'https://github.com' + $(this).attr('href');
          result.push({
            'name': name,
            'url': url
          });
        });
      });
      return cb(null, result);
    });
}

