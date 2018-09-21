$(document).ready(function() {

    // tr onclick urls
    $('tr[data-url]').click(function () {
        window.location = $(this).data('url');
        return false;
    });

});