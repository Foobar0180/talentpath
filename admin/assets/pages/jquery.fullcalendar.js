!function($) {
    "use strict";

    var CalendarApp = function() {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
        this.$event = ('#external-events div.external-event'),
        this.$calendar = $('#calendar'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$categoryForm = $('#add-category form'),
        this.$extEvents = $('#external-events'),
        this.$calendarObj = null
    };

    // On drop
    CalendarApp.prototype.onDrop = function (eventObj, date) {
        var $this = this;
        // Retrieve the dropped element's stored Event Object
        var originalEventObject = eventObj.data('eventObject');
        var $categoryClass = eventObj.attr('data-class');

        // We need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject);

        // Assign it the date that was reported
        copiedEventObject.start = date;
        if ($categoryClass)
            copiedEventObject['className'] = [$categoryClass];

        // Render the event on the calendar
        $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);

        // Is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // If so, remove the element from the "Draggable Events" list
            eventObj.remove();
        }
    },

    // On click
    CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
        var $this = this;
        var form = $("<form></form>");
        form.append("<label>Change event name</label>");
        form.append("<div class='input-group'><input class='form-control' type=text value='" + calEvent.title + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect'><i class='fa fa-check'></i> Save</button></span></div>");
        $this.$modal.modal({
            backdrop: 'static'
        });
        $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
            $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                return (ev._id == calEvent._id);
            });
            $this.$modal.modal('hide');
        });
        $this.$modal.find('form').on('submit', function () {
            calEvent.title = form.find("input[type=text]").val();
            $this.$calendarObj.fullCalendar('updateEvent', calEvent);
            $this.$modal.modal('hide');
            return false;
        });
    },

    // On select
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        var $this = this;
        $this.$modal.modal({
            backdrop: 'static'
        });

        var form = $("<form></form>");
        form.append("<div class='row'></div>");
        form.find(".row")
            .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Event Name</label><input class='form-control' placeholder='Insert Event Name' type='text' name='title'/></div></div>")
            .append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category'></select></div></div>")
            .find("select[name='category']")
            .append("<option value='bg-danger'>Danger</option>")
            .append("<option value='bg-success'>Success</option>")
            .append("<option value='bg-purple'>Purple</option>")
            .append("<option value='bg-primary'>Primary</option>")
            .append("<option value='bg-warning'>Warning</option></div></div>");

        $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
            form.submit();
        });

        $this.$modal.find('form').on('submit', function () {
            var title = form.find("input[name='title']").val();
            var beginning = form.find("input[name='beginning']").val();
            var ending = form.find("input[name='ending']").val();
            var categoryClass = form.find("select[name='category'] option:checked").val();

            if (title !== null && title.length != 0) {
                $this.$calendarObj.fullCalendar('renderEvent', {
                    title: title,
                    start:start,
                    end: end,
                    allDay: false,
                    className: categoryClass
                }, true);
                $this.$modal.modal('hide');
            }
            else{
                alert('You have to give a title to your event');
            }
            return false;
        });
        $this.$calendarObj.fullCalendar('unselect');
    },
    CalendarApp.prototype.enableDrag = function() {
        $(this.$event).each(function () {
            // Create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // It doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // Use the element's text as the event title
            };

            // Store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);

            // Make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true, // Will cause the event to go back to its original position after the drag
                revertDuration: 0
            });
        });
    }

    CalendarApp.prototype.init = function() {
        this.enableDrag();

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());

        var defaultEvents =  [{
                title: 'Interview with Thomas Crown',
                start: new Date($.now() + 158000000),
                className: 'fc-event-purple'
            }, {
                title: 'Phone Screen with Isabelle Olsson',
                start: today,
                end: today,
                className: 'fc-event-pink'
            }, {
                title: 'Profile Assessment to Anthony Evans',
                start: new Date($.now() + 338000000),
                className: 'fc-event-primary'
            }, {
                title: 'Phone Screen with Martin Stokes',
                start: new Date($.now() + 672000000),
                end: new Date($.now() + 672000000),
                className: 'fc-event-pink'
            }, {
                title: 'Confirm Interview with Mark Hooper',
                start: new Date($.now() + 982000000),
                end: new Date($.now() + 982000000),
                className: 'fc-event-success'
            }];

        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            slotDuration: '00:15:00', // If we want to split day time each 15 minutes
            minTime: '08:00:00',
            maxTime: '19:00:00',
            defaultView: 'month',
            slotLabelFormat: 'HH:mm',
            timeFormat: {
                agenda: 'H:mm{ - h:mm}'
            },
            handleWindowResize: true,
            height: $(window).height() - 200,
            header: {
                left: 'month,agendaWeek,agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            events: defaultEvents,
            editable: false,
            droppable: false, // This allows things to be dropped onto the calendar !!!
            eventLimit: true, // Allow "more" link when too many events
            selectable: false,
            drop: function(date) { $this.onDrop($(this), date); },
            select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
            eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); },
        });

        // On new event
        this.$saveCategoryBtn.on('click', function(){
            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            if (categoryName !== null && categoryName.length != 0) {
                $this.$extEvents.append('<div class="external-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-move"></i>' + categoryName + '</div>')
                $this.enableDrag();
            }
        });
    },

    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp

}(window.jQuery),

// Initialise CalendarApp
function($) {
    "use strict";
    $.CalendarApp.init();

    var left = $(".fc-toolbar").find(".fc-left");
    if (left !== null) {
      $(left).find(".fc-button-group").addClass("btn-group");
      $(left).find(".fc-button").addClass("btn btn-primary waves-effect");
    }

    var right = $(".fc-toolbar").find(".fc-right");
    if (right !== null) {
      $(right).find(".fc-button-group").addClass("btn-group");
      $(right).find(".fc-button").addClass("btn btn-default waves-effect");

      $('.fc-toolbar').find('.fc-prev-button').html($('<span />').attr('class', 'fa fa-chevron-left'));
      $('.fc-toolbar').find('.fc-next-button').html($('<span />').attr('class', 'fa fa-chevron-right'));
    }
}(window.jQuery);
