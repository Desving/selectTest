console.log('gg');
$(document).ready(function () {
    $('#typeReport').fancySelect();
    $('#volumeReport').fancySelect();
    $('.field-email input[type="checkbox"]').styler();
    $('.time-buttons .time-button').on('click', function () {
        clearActiveTimeButton();
        var period = this.dataset.period;
        switch(period) {
            case 'week':
                lastWeek();
                break;

            case 'month':
                lastMonth();
                break;

            case 'quarter':
                lastQuarter();
                break;
        }
        $(this).addClass('time-button_active');
    });

    $('.applyBtn').on('click', function () {
        console.log('click');
        clearActiveTimeButton()
    });

    function lastWeek() {
        console.log(moment().subtract(1, 'weeks').format('DD.MM.YYYY'));
        console.log(moment().subtract(1, 'days').format('DD.MM.YYYY'));
        from = moment().subtract(1, 'weeks');
        to = moment().subtract(1, 'days');
        setDateToCalendar(from, to)

    }
    function lastMonth() {
        console.log(moment().subtract(1,'months').format('DD.MM.YYYY'));
        console.log(moment().subtract(1,'day').format('DD.MM.YYYY'));
        from = moment().subtract(1,'months');
        to = moment().subtract(1,'day');
        setDateToCalendar(from, to)
    }
    function lastQuarter() {
        console.log(moment().startOf('quarter').format('DD.MM.YYYY'));
        console.log(moment().endOf('quarter').format('DD.MM.YYYY'));
        from = moment().startOf('quarter');
        to = moment().endOf('quarter');
        setDateToCalendar(from, to)
    }
    function setDateToCalendar(from, to) {
        $("#dateFilter").data('daterangepicker').setStartDate(from);
        $("#dateFilter").data('daterangepicker').setEndDate(to);
        $('#dateFilter').val(from.format('DD.MM.YYYY') + ' - ' + to.format('DD.MM.YYYY'));
        $('.date-text').text(from.format('DD.MM.YYYY') + ' - ' + to.format('DD.MM.YYYY'));
    }

    // date filter
    $('#dateFilter').daterangepicker({
        timePicker: false,
        //autoApply: true, // применять сразу без кнопки
        autoUpdateInput: false, // обновлять инпут вручную на событиях
        buttonClasses: 'btn date-popup-btn',
        applyButtonClasses: 'date-popup-apply btn-green',
        cancelButtonClasses: 'date-popup-cancel btn-white hidden',
        maxSpan: {
            "months": 3
        },
        locale: dateRangePickerLocale
    });


    $('#dateFilter').on('apply.daterangepicker', function (ev, picker) {
        clearActiveTimeButton();
        $(this).val(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY'));

        $('.date-text').text(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY'));
        toggleListTitle('date');

        $('.clear-filter').show();
    });
    $('#dateFilter').on('cancel.daterangepicker', function (ev, picker) {
        var from = $('#dateFilter').data('default-from'),
            to = $('#dateFilter').data('default-to');

        $(this).val(from + ' - ' + to);
        $("#dateFilter").data('daterangepicker').setStartDate(from);
        $("#dateFilter").data('daterangepicker').setEndDate(to);

        $('.date-text').text(from + ' - ' + to);
        $('.clear-filter').hide();

    });

    $('.clear-filter').click(function () {
        var from = $('#dateFilter').data('default-from'),
            to = $('#dateFilter').data('default-to');

        $(this).val(from + ' - ' + to);
        $("#dateFilter").data('daterangepicker').setStartDate(from);
        $("#dateFilter").data('daterangepicker').setEndDate(to);

        $('.date-text').text(from + ' - ' + to);

        $(this).hide();
    });

    function clearActiveTimeButton() {
        if ($('.time-buttons .time-button').hasClass('time-button_active')) {
            $('.time-buttons .time-button').removeClass('time-button_active')
        }
    }
});