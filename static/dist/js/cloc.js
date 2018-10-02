$(function() {

    function getClients() {
        return $.ajax({
            type: "GET",
            url: clientListUrl
        });
    }

    function getJobs() {
        return $.ajax({
            type: "GET",
            url: jobListUrl
        });
    }

    function getTasks() {
        return $.ajax({
            type: "GET",
            url: taskListUrl,
            data: {
                assignee: currentUser,
                search: $('[name=search]').val()
            }
        });
    }

    function buildClientList(show) {
        $.when(getClients(), getJobs(), getTasks()).done(function (clients, jobs, tasks) {
            // loop each task and dynamically add it to the list of tasks under the client's jobs
            var clientTree = $("<ul></ul>").addClass("client-list");

            $.each(tasks[0], function(index, task) {
                var clientNode, jobNode, taskNode, foundNodes;
                var job = jobs[0].find(item => item.id === task.job);
                var client = clients[0].find(item => item.id === job.client);

                foundNodes = clientTree.find("[data-client-id=" + client.id + "]");
                if (foundNodes.length == 0) {
                    clientNode = $('<li data-client-id="' + client.id + '"></li>');
                    var clientLink = $("<a></a>").addClass("client").text(client.name);
                    clientNode.append(clientLink).append('<ul></ul>');
                    clientTree.append(clientNode);
                } else {
                    clientNode = $(foundNodes[0]);
                }

                foundNodes = clientNode.find("[data-job-id=" + job.id + "]");
                if (foundNodes.length == 0) {
                    jobNode = $('<li data-job-id="' + job.id + '"></li>');
                    if (!show) {
                        jobNode.hide();
                    }
                    var jobLink = $("<a></a>").addClass("job").text(job.title);
                    jobNode.append(jobLink).append('<ul></ul>');
                    clientNode.find('ul').first().append(jobNode);
                } else {
                    jobNode = $(foundNodes[0]);
                }

                taskNode = $('<li data-task-id="' + task.id + '" data-title="' + task.title + '" data-colour="' + job.colour + '"></li>');
                taskNode.text(task.title).addClass("task").css("background", job.colour);

                if (!show) {
                    taskNode.hide();
                }

                taskNode.draggable({
                    cursor: "move",
                    zIndex: 100,
                    revert: true,
                    revertDuration: 0,
                    helper: function(event) {
                        return $( "<div class='task-drag-element'>" + task.title + "</div>" );
                    }
                });
                jobNode.find('ul').first().append(taskNode);
            });

            $(".client-list-wrapper").html(clientTree);
        });
    }

    buildClientList(false);

    $('[name=search]').on('change', function () {
        var show = $(this).val() !== "";
        buildClientList(show);
    });

    $(document).on('click', '[data-client-id] a', function (evt) {
        evt.stopPropagation();
        $(this).siblings('ul').find('[data-job-id]').toggle();
    });

    $(document).on('click', '[data-job-id] a', function (evt) {
        evt.stopPropagation();
        $(this).siblings('ul').find('[data-task-id]').toggle();
    });

    $(document).on('change', '.fc-day-header .fc-dailycontrol input[type=checkbox]', function () {
        var _this = $(this);
        $.ajax({
            type: "POST",
            url: timeDailySignoffUrl,
            headers: ajaxHeaders,
            data: JSON.stringify({
                date: $(_this).closest('.fc-day-header').data('date'),
                user: currentUser,
                completed: $(_this)[0].checked
            }),
            error: function (err) {
                console.log(err);
            }
        });
    });

    var clocOptions = {
        defaultView: 'agendaWeek',
        header: {center: 'agendaDay,agendaWeek'},
        firstDay: 1,
        allDaySlot: false,
        nowIndicator: true,
        slotEventOverlap: false,
        slotDuration: { minutes: 5 },
        snapDuration: { minutes: 1 },
        defaultTimedEventDuration: { minutes: 5 },
        scrollTime: moment().format('HH:MM:SS'),
        editable: true,
        dragRevertDuration: 0,
        droppable: true,
        eventOverlap: false,
        events: function (start, end, timezone, callback) {
            $.ajax({
                type: "GET",
                url: timeEntryListUrl,
                data: {
                    user: currentUser,
                    started_at_after: start.format("YYYY-MM-DD"),
                    started_at_before: end.format("YYYY-MM-DD")
                },
                success: function (data) {
                    var events = [];
                    $(data).each(function () {
                        events.push({
                            title: $(this).attr('title'),
                            start: $(this).attr('started_at'),
                            end: $(this).attr('ended_at'),
                            id: $(this).attr('id'),
                            task: $(this).attr('task'),
                            comments: $(this).attr('comments'),
                            color: $(this).attr('colour'),
                            duration: $(this).attr('duration'),
                            textColor: 'black'
                        });
                    });
                    if (callback) callback(events);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        viewRender: function(view, element) {
            // add the controls to the day header
            $.each($(".fc-day-header"), function(key, val) {
                $(this).append('<div class="fc-dailycontrol"><div class="checkbox"><label><input type="checkbox"><span></span><em>00:00</em></label></div></div>');
            });
            // and call the api to see whats completed
            $.ajax({
                type: "GET",
                url: timeDailySignoffUrl,
                data: {
                    user: currentUser,
                    date_after: view.start.format("YYYY-MM-DD"),
                    date_before: view.end.format("YYYY-MM-DD")
                },
                success: function (data) {
                    $(data).each(function () {
                        if ($(this).attr('completed') === true) {
                            $('.fc-day-header[data-date="' + $(this).attr('date') + '"] .fc-dailycontrol input[type=checkbox]').attr('checked', 'checked');
                        }
                    });
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        eventRender: function(event, element, view) {
            // reset the totals for eventAfterRender
            var currentday = moment(event.start).format("YYYY-MM-DD");
            $(".fc-day-header[data-date=" + currentday + "] em").text("00:00");
        },
        eventAfterRender: function(event, element, view) {
            // on render of each event append the duration to the running total fro the day
            var currentday = moment(event.start).format("YYYY-MM-DD");
            var ctrl = $(".fc-day-header[data-date=" + currentday + "] em");

            if (event.duration) {
                var prev = moment.duration(ctrl.text() || "00:00");
                var thisEvent = moment.duration(event.duration);
                var total = thisEvent.add(prev);
                var formatted = moment.utc(total.asMilliseconds()).format("HH:mm");

                ctrl.text(formatted);
            }
        },
        eventDestroy: function(event, element, view) {
            // on destroy of an event remove it from the total
            var currentday = moment(event.start).format("YYYY-MM-DD");
            var ctrl = $(".fc-day-header[data-date=" + currentday + "] em");

            if (event.duration) {
                var prev = moment.duration(ctrl.text() || "00:00");
                var thisEvent = moment.duration(event.duration);
                var total = prev.subtract(thisEvent);
                var formatted = moment.utc(total.asMilliseconds()).format("HH:mm");

                ctrl.text(formatted);
            }
        },
        drop: function(date, jsEvent) {
            // on external drop add a new event
            $.ajax({
                type: "POST",
                url: timeEntryListUrl,
                headers: ajaxHeaders,
                data: JSON.stringify({
                    task: $(jsEvent.target).data('task-id'),
                    user: currentUser,
                    started_at: date.toISOString(),
                    ended_at: date.clone().add(clocOptions.defaultTimedEventDuration.minutes, 'minutes').toISOString()
                }),
                success: function (data) {
                    var event = {
                        title: $(data).attr('title'),
                        start: $(data).attr('started_at'),
                        end: $(data).attr('ended_at'),
                        id: $(data).attr('id'),
                        task: $(data).attr('task'),
                        comments: $(data).attr('comments'),
                        color: $(data).attr('colour'),
                        duration: $(data).attr('duration'),
                        textColor: 'black',
                    };
                    $('.cloc').fullCalendar('renderEvent', event, false);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        },
        eventDrop: function(event, delta, revertFunc, jsEvent) {
            // when dropping an event either add a new one or copy if the shift key was being pressed
            if (!jsEvent.shiftKey) {
                // update event with new dates
                $.ajax({
                    type: "PATCH",
                    url: timeEntryListUrl + event.id + '/',
                    headers: ajaxHeaders,
                    data: JSON.stringify({
                        started_at: event.start.toISOString(),
                        ended_at: event.end.toISOString()
                    }),
                    error: function (err) {
                        revertFunc();
                    }
                });
            } else {
                // copy the event to where its dropped and revert the original
                $.ajax({
                    type: "POST",
                    url: timeEntryListUrl,
                    headers: ajaxHeaders,
                    data: JSON.stringify({
                        task: event.task,
                        user: currentUser,
                        started_at: event.start.toISOString(),
                        ended_at: event.start.clone().add(clocOptions.slotDuration.minutes, 'minutes').toISOString()
                    }),
                    success: function (data) {
                        var event = {
                            title: $(data).attr('title'),
                            start: $(data).attr('started_at'),
                            end: $(data).attr('ended_at'),
                            id: $(data).attr('id'),
                            task: $(data).attr('task'),
                            comments: $(data).attr('comments'),
                            color: $(data).attr('colour'),
                            duration: $(data).attr('duration'),
                            textColor: 'black',
                        };
                        $('.cloc').fullCalendar('renderEvent', event, false);
                    },
                    error: function (err) {
                        revertFunc();
                    }
                });
                revertFunc();
            }
        },
        eventResize: function(event, delta, revertFunc) {
            // when resizing an event do a patch update to amend the start and end dates
            $.ajax({
                type: "PATCH",
                url: timeEntryListUrl + event.id + '/',
                headers: ajaxHeaders,
                data: JSON.stringify({
                    started_at: event.start.toISOString(),
                    ended_at: event.end.toISOString()
                }),
                success: function (data) {
                    event.duration = $(data).attr('duration');
                    $(".cloc").fullCalendar('updateEvent', event);
                },
                error: function (err) {
                    revertFunc();
                }
            });
        },
        eventClick: function(calEvent) {
            // on click of an event open the overlay to edit it
            var pk = calEvent.id;
            var clocOverlay = $('.cloc-event-overlay');

            // sets the detail in the form from the event data
            clocOverlay.find('.title').html(calEvent.title);
            clocOverlay.css("background-color", calEvent.color);
            clocOverlay.find('[name=task]').val(calEvent.task);
            clocOverlay.find('[name=comments]').val(calEvent.comments);
            clocOverlay.find('[name=start_time]').val(calEvent.start.format("HH:mm"));
            clocOverlay.find('[name=end_time]').val(calEvent.end.format("HH:mm"));

            // show the overlay
            clocOverlay.addClass('in');

            // remove any previous events
            clocOverlay.find('form').off('submit');
            clocOverlay.find('.close').off('click');
            clocOverlay.find('.delete').off('click');
            $(document).off('click', '.client-list .task');

            // setup close event
            clocOverlay.find('.close').on('click', function () {
                clocOverlay.removeClass('in');
            });

            // setup update event
            clocOverlay.find('form').on('submit', function (evt) {
                var task = $(this).find('[name=task]').val();
                var startSplit = $('[name=start_time]').val().split(':');
                var endSplit = $('[name=end_time]').val().split(':');
                var comments = $(this).find('[name=comments]').val();
                $.ajax({
                    type: "PATCH",
                    url: timeEntryListUrl + calEvent.id + '/',
                    headers: ajaxHeaders,
                    data: JSON.stringify({
                        task: task,
                        started_at: calEvent.start.set({h: startSplit[0], m: startSplit[1]}),
                        ended_at: calEvent.end.set({h: endSplit[0], m: endSplit[1]}),
                        comments: comments
                    }),
                    success: function (data) {
                        calEvent.title = $(data).attr('title');
                        calEvent.start = $(data).attr('started_at');
                        calEvent.end = $(data).attr('ended_at');
                        calEvent.id = $(data).attr('id');
                        calEvent.task = $(data).attr('task');
                        calEvent.comments = $(data).attr('comments');
                        calEvent.color = $(data).attr('colour');
                        calEvent.duration = $(data).attr('duration');

                        $('.cloc').fullCalendar('updateEvent', calEvent);

                        clocOverlay.removeClass('in');
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });

                evt.preventDefault();
            });

            // setup delete event
            clocOverlay.find('.delete').on('click', function (evt) {
                evt.preventDefault();
                $.ajax({
                    type: "DELETE",
                    url: timeEntryListUrl + pk + '/',
                    headers: ajaxHeaders,
                    success: function (data) {
                        $('.cloc').fullCalendar('removeEvents', calEvent.id);
                        clocOverlay.removeClass('in');
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            });

            // select another task for the event
            $(document).on('click', '.client-list .task', function (evt) {
                var task = $(this).data('task-id');
                var title = $(this).closest('[data-job-id]').find('.job').text() + ' - ' + $(this).data('title');
                var colour = $(this).data('colour');

                clocOverlay.find('[name=task]').val(task);
                clocOverlay.find('.title').html(title);
                clocOverlay.css("background-color", colour);

                evt.stopPropagation();
            });
        }
    };

    $('.cloc').fullCalendar(clocOptions);

    $('input[name=cloc_slot_duration]').on('change', function () {
        if ($(this).val() > 0) {
            clocOptions.slotDuration.minutes = $(this).val();
            $('.cloc').fullCalendar('destroy');
            $('.cloc').fullCalendar(clocOptions);
        }
    });

});