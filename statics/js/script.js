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
      console.log(identities);
    } else {
      console.log("nope");
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
