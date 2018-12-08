//https://stackoverflow.com/questions/31174698/unable-to-prevent-an-input-from-submitting-when-press-the-enter-key-on-it
$(document).ready(function() {
    $(document).keypress(function(key) {
        if (key.keyCode == 13) {
            key.preventDefault();
        }
    });
});
