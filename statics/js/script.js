;+(function($){
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
        .done(function() {
          $("#identities").find(".form-group").addClass("has-success");
        })
        .fail(function() {
          alert( "error" );
        });
    } else {
      console.log("not submittable");
    }

  }
  $(function(){
    $("#identities").submit(function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      submitForm();
    });
  });

})(jQuery);
