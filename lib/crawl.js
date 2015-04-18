var github = require(__dirname + '/crawler/github.js');
var codecademy = require(__dirname + '/crawler/codecademy.js');
var codeschool = require(__dirname + '/crawler/codeschool.js');

var async = require('async');

module.exports = function(providers, callback) {
  tasks = [];
  if (providers.github) {
    tasks.push({
      'task': github,
      'name': 'github',
      'param': providers.github
    });
  }
  if (providers.codecademy) {
    tasks.push({
      'task': codecademy,
      'name': 'codecademy',
      'param': providers.codecademy
    });
  }
  if (providers.codeschool) {
    tasks.push({
      'task': codeschool,
      'name': 'codeschool',
      'param': providers.codeschool
    });
  }

  async.map(tasks, function(item, cb) {
    item.task(item.param, function(err, result) {
      if (err) {
        return cb(err);
      }
      obj = {};
      obj[item.name] = result;
      return cb(null, obj)
    });
  }, callback);
}
