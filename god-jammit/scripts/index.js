firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $("#login").html("Sign out");
    $("#login").on("click", function() {
        firebase.auth().signOut();
        window.open("/", "_self");
        return false;
    });
  }
});

$(document).ready(function() {
    $('#project').click(function() {
        var request = new XMLHttpRequest();
        request.open("POST", "/", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function() {
            if (request.status == 200 && request.readyState == 4) {
                window.open(request.responseText, "_self");
            }
        };
        var user = firebase.auth().currentUser;
        if (user) {
            request.send("logged_in=true");
        }
        else {
            request.send("logged_in=false");
        }
    });
});
