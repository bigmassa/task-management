$( function() {
    $(".flatpickr").flatpickr({
        allowInput: true,
        dateFormat: 'd/m/Y',
        locale: {
            firstDayOfWeek: 1
        }
    });
    $(document).on("click", "[data-picker-trigger]", function() {
        $(this).parent().find('input')[0]._flatpickr.toggle();
    })
});
