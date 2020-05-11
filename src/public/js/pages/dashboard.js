/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

function downloadPost(post_id) {
    console.log(post_id);

    var url = "download_post";
    if (post_id);
    $.ajax({
        url: url,
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        data: {
            post_id: post_id,
        }
    });
}

$(function () {

    'use strict'
    var categoryId, startDate, endDate, keyword;

    $(".categories").click(function () {
        categoryId = $(this).attr("data-id");
        search();
    });

    $("#keywordSearch").keydown(function () {
        keyword = $(this).val();
        search();
    });

    function search() {
        var url = "search";
        if (categoryId == 0 || categoryId == "0") categoryId = "";
        $.ajax({
            url: url,
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            data: {
                category: categoryId,
                startDate: startDate,
                endDate: endDate,
                keyword: keyword
            },
            success: function (data) {
                $("#postContent").html(data);
            }
        });
    }



    // Make the dashboard widgets sortable Using jquery UI
    $('.connectedSortable').sortable({
        placeholder: 'sort-highlight',
        connectWith: '.connectedSortable',
        handle: '.card-header, .nav-tabs',
        forcePlaceholderSize: true,
        zIndex: 999999
    })
    $('.connectedSortable .card-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

    // jQuery UI sortable for the todo list
    $('.todo-list').sortable({
        placeholder: 'sort-highlight',
        handle: '.handle',
        forcePlaceholderSize: true,
        zIndex: 999999
    })

    // bootstrap WYSIHTML5 - text editor
    $('.textarea').summernote({
        height: 250
    });

    $('.daterange').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
    }, function (start, end) {
        startDate = start.format("YYYY-MM-DD HH:mm:ss");
        endDate = end.format("YYYY-MM-DD HH:mm:ss");
        search();
    })

    /* jQueryKnob */
    $('.knob').knob()

    // The Calender
    $('#calendar').datetimepicker({
        format: 'L',
        inline: true
    })

    // SLIMSCROLL FOR CHAT WIDGET
    $('#chat-box').overlayScrollbars({
        height: '250px'
    })



    var underlineMenuItems = document.querySelectorAll(".categories");
    underlineMenuItems[0].classList.add("active");
    underlineMenuItems.forEach(function (item) {
        item.addEventListener("click", function () {
            underlineMenuItems.forEach(function (item) {
                return item.classList.remove("active");
            });
            item.classList.add("active");
        });
    });


    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
})