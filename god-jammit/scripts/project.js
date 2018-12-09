//https://stackoverflow.com/questions/31174698/unable-to-prevent-an-input-from-submitting-when-press-the-enter-key-on-it
var id = document.URL.split('/');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $(document).ready(function() {
        $('#owner').val(user.displayName);
    });
  }
});

$(document).ready(function() {
    $(document).keypress(function(key) {
        if (key.keyCode == 13) {
            key.preventDefault();
        }
    });
    $('#id').val(id[3]);
});

//https://stackoverflow.com/questions/639815/how-to-disable-all-div-content
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
      $(document).ready(function() {
        $('#fun').addClass('disabled');
      });
  }
});
