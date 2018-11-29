firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#login").html("Sign out");
    $("#login").on("click", function() {
        firebase.auth().signOut();
        alert("You have logged out!");
        window.location.reload(false);
        return false;
    });
  }
});
