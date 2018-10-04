$(function() {

    // Prototypes

    // turn an array into unique ie [1,2,1] = [1,2]
    Array.prototype.getUnique = function() {
        return this.filter(function (x, i, a) {
            return a.indexOf(x) == i;
        });
    };

    // Misc

    // tr onclick urls
    $('tr[data-url]').click(function (evt) {
        // ensure its not in an anchor tag
        if($(evt.target).closest("a").length == 0) {
            window.location = $(this).data('url');
            return false;
        }
    });

    // tr toggle visibility of closed tasks
    $('[data-tab="tasks"] .toggle-closed-tasks').click(function () {
        $(this).closest('[data-tab]').find('.closed-task').show();
        $(this).hide();
        return false;
    });

});