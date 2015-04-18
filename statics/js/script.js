;+(function($){
  "verwende streng";
  var items = null;
  var template = "";
  var submitForm = function() {
    var submittable = false;
    var identities = {
      "codecademy" : null,
      "codeschool" : null,
      "github" : null
    }
    for (var i in identities) {
      var id = $("#identities").find("input[name='"+i+"']").val().trim();
      if (id.length > 0) {
        identities[i] = id;
        submittable = true;
      } else {
        identities[i] = null;
      }
    }
    if (submittable) {
      var jqxhr = $.post("/generate", identities)
        .done(function(data) {
          $("#identities").find(".form-group").addClass("has-success");
          items = data;

          for (var cat in items) {
            for (var i = 0; i < items[cat].length; i++) {
              items[cat][i].enabled = true;
            }
          }

          if (data && "github" in data) {
            handleGitHubRepos(data.github);
          }
          if (data && "codeschool" in data) {
            handleCodeSchoolCourses(data.codeschool);
          }
          if (data && "codecademy" in data) {
            handleCodecademyTracks(data.codecademy);
          }
          $("a.repolink").click(function(evt){
            evt.stopPropagation();
          })
          makeLatex();
          $("#code-out-section").removeClass("hidden")
        })
        .fail(function() {
          alert( "error" );
        });
    } else {
      console.log("not submittable");
    }

  }

  var toggleItem = function() {
    items[$(this).attr("data-cat")][$(this).attr("data-id")].enabled = !items[$(this).attr("data-cat")][$(this).attr("data-id")].enabled;
    $(this).toggleClass("disabled");
    makeLatex();
  }

  var makeLatex = function(){
    var data = {};
    for (var cat in items) {
      for (var i = 0; i < items[cat].length; i++) {
        if (items[cat][i].enabled) {
          if (! (cat in data)) {
            data[cat] = [];
          }
          data[cat].push(items[cat][i]);
        }
      }
    }

    var latex    = template(data);
    $("#code-out").text(latex);
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  var handleGitHubRepos = function (repos) {
    for (var i = 0; i < repos.length; i++) {
      $item = $('<div class="col-lg-4 col-sm-6">\
          <div class="portfolio-box item-box" data-cat="github">\
              <div class="portfolio-box-caption">\
                  <div class="portfolio-box-caption-content">\
                      <div class="project-category text-faded">GitHub Repo <a class="repolink" target="_blank" href="#"><span class="fa fa-external-link"></span></a></div>\
                      <div class="project-name"></div>\
                  </div>\
              </div>\
          </div>\
      </div>');
      $item.find(".item-box").attr("data-id", i).click(toggleItem);
      $item.find(".project-name").text(repos[i].name);
      $item.find("a.repolink").attr("href", repos[i].url);

      $("#item-target").append($item);
    }
  }

  var handleCodeSchoolCourses = function (repos) {
    for (var i = 0; i < repos.length; i++) {
      $item = $('<div class="col-lg-4 col-sm-6">\
          <div class="portfolio-box codeschool item-box" data-cat="codeschool">\
              <div class="portfolio-box-caption">\
                  <div class="portfolio-box-caption-content">\
                      <div class="project-category text-faded">Code School Course <a class="repolink" target="_blank" href="#"><span class="fa fa-external-link"></span></a></div>\
                      <div class="project-name"></div>\
                  </div>\
              </div>\
          </div>\
      </div>');
      $item.find(".item-box").attr("data-id", i).click(toggleItem);
      $item.find(".project-name").text(repos[i].course);
      $item.find("a.repolink").attr("href", repos[i].url);
      $("#item-target").append($item);
    }
  }

  var handleCodecademyTracks = function (repos) {
    for (var i = 0; i < repos.length; i++) {
      $item = $('<div class="col-lg-4 col-sm-6">\
          <div class="portfolio-box codecademy item-box" data-cat="codecademy">\
              <div class="portfolio-box-caption">\
                  <div class="portfolio-box-caption-content">\
                      <div class="project-category text-faded">Codecademy Track <a class="repolink" target="_blank" href="#"><span class="fa fa-external-link"></span></a></div>\
                      <div class="project-name"></div>\
                  </div>\
              </div>\
          </div>\
      </div>');
      $item.find(".item-box").attr("data-id", i).click(toggleItem);
      $item.find(".project-name").text(repos[i].track);
      $item.find("a.repolink").attr("href", repos[i].url);
      $("#item-target").append($item);
    }
  }

  $(function(){
    var source   = $("#entry-template").html();
    template = Handlebars.compile(source);
    $("#identities").submit(function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      submitForm();
    });
  });

})(jQuery);
