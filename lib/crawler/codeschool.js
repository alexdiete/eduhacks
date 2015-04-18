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
      $('.card-section').each(function(i, element) {
        if ($(this).find('h2').text() == 'Completed Courses') {
          var result = [];
          $(this).find('.card').each(function(i, element) {
            var course = $(this).find('h3').text();
            var url = 'http://https://www.codeschool.com' + $(this).find('h3 a').attr('href');
            result.push({
              'course': course,
              'url': url
            });
          });
          return cb(null, result);
        }
      });
    });
}

