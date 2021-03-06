window.setInterval(function(){
  checkserver();
}, 5000);

/* Ajax loader */
function ajax_loader(key) {
    if (key == "clear") {
        $(".ajax-loader").remove();
    } else {
        $(".ajax-loader").remove();
        $(key).after("<span class='ajax-loader'></span>");
    }
}

/**************************** math captcha function ***********************/

var total;

function getRandom(){
    return Math.ceil(Math.random()* 20);
}

function createSum(){
    var randomNum1 = getRandom(),
    randomNum2 = getRandom();
    total =randomNum1 + randomNum2;
    $("#question" ).text( randomNum1 + " + " + randomNum2 + "=" );  
    $("#ans").val('');
    checkInput();
}

function checkInput(){
    var input = $("#ans").val(), 
    slideSpeed = 200,
    hasInput = !!input, 
    valid = hasInput && input == total;
    $('#message').toggle(!hasInput);
    $('input[type=submit]').prop('disabled', !valid);  
    $('#success').toggle(valid);
    $('#fail').toggle(hasInput && !valid);
}
/**************************** math captcha function end *******************/
$(document.body).ready(function() {

    checkserver();

    var editor = CodeMirror.fromTextArea(document.getElementById(
        "code"), {
        lineNumbers: true,
        lineWrapping: true,
        theme: "default",
        extraKeys: {
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption(
                    "fullScreen"));
            },
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm
                    .setOption(
                        "fullScreen", false);
            }
        }
    });

    var result = CodeMirror.fromTextArea(document.getElementById(
        "result"), {
        lineWrapping: true,
        theme: "default",
        readOnly: true,
        extraKeys: {
            "F11": function(cm) {
                cm.setOption("fullScreen", !cm.getOption(
                    "fullScreen"));
            },
            "Esc": function(cm) {
                if (cm.getOption("fullScreen")) cm
                    .setOption(
                        "fullScreen", false);
            }
        }
    });

    var initial_code = '';
    // editor.setValue("");
    // result.setValue("");
    // editor.clearHistory();

    // hide revision submit button initially
    // $("#submit-revision").show()

    /* Code Mirror Controls */
    $fullscreen_code = $("#fullscreen-code");
    $toggle_code = $("#toggle-code");

    $fullscreen_code.click(function(e) {
        alert("Press escape to exit from fullScreen mode");
        editor.setOption("fullScreen", !editor.getOption(
            "fullScreen"));
        editor.focus();
        e.preventDefault();
    });

    $toggle_code.click(function(e) {
        if (editor.getOption("theme") == "monokai") {
            editor.setOption("theme", "default");
        } else {
            editor.setOption("theme", "monokai");
        }
        e.preventDefault();
    });

    $fullscreen_result = $("#fullscreen-result");
    $toggle_result = $("#toggle-result");

    $fullscreen_result.click(function(e) {
        alert("Press escape to exit from fullScreen mode");
        result.setOption("fullScreen", !result.getOption(
            "fullScreen"));
        result.focus();
        e.preventDefault();
    });

    $toggle_result.click(function(e) {
        if (result.getOption("theme") == "monokai") {
            result.setOption("theme", "default");
        } else {
            result.setOption("theme", "monokai");
        }
        e.preventDefault();
    });

    /* 
     * Selectors function
     * Write the queries using .on()
     */
    /* Contributor details */
    // $(document).on("click", "#bug-form #id_notify", function() {
    //     $("#id_email_wrapper").toggle(this.checked);
    // });

    $("#plot_download").hide();
    $("#diff-wrapper").hide();
    $("#databox-wrapper").hide();
    if ($("#main_categories").val() == 0) {
        $('#main_categories').prop('selectedIndex',0);
        $("#category-wrapper").hide();
        $("#books-wrapper").hide();
        $("#chapters-wrapper").hide();
        $("#examples-wrapper").hide();
        $("#revisions-wrapper").hide();
        $("#download-book").hide();
        $("#diff-wrapper").hide();
        $("#contributor").hide();
        $("#databox-wrapper").hide();
    }
    if ($("#categories").val() == 0) {
        $("#books-wrapper").hide();
        $("#chapters-wrapper").hide();
        $("#examples-wrapper").hide();
        $("#revisions-wrapper").hide();
        $("#download-book").hide();
        $("#diff-wrapper").hide();
        $("#contributor").hide();
        $("#databox-wrapper").hide();
    }
    if ($("#books").val() == 0) {
        $("#chapters-wrapper").hide();
        $("#examples-wrapper").hide();
        $("#revisions-wrapper").hide();
        $("#download-book").hide();
        $("#diff-wrapper").hide();
        $("#contributor").hide();
        $("#databox-wrapper").hide();
    } else {
        $("#download-book").show();
        $("#contributor").show();
    }
    if ($("#chapters").val() == 0) {
        $("#examples-wrapper").hide();
        $("#revisions-wrapper").hide();
        $("#diff-wrapper").hide();
        $("#download-chapter").hide();
    } else {
        $("#download-chapter").show();
    }
    if ($("#examples").val() == 0) {
        $("#revisions-wrapper").hide();
        $("#diff-wrapper").hide();
        $("#download-example").hide();
        $("#databox-wrapper").hide();
    } else {
        $("#download-example").show();
    }
    /*******************************************/
    /******  Below removed dajax ***************/
    /*******************************************/
    /*********** Main categories change ********/
    /*******************************************/
    $(document.body).on("change", "#main_categories",
        function() {
            ajax_loader(this);
            var maincat_id = $('#main_categories').find(
                ":selected").val();
            if (maincat_id != 0) {
                $("#categories").html("");
                $("#category-wrapper").show();
                $("#books").html("");
                editor.setValue("");
                result.setValue("");
                $("#example_views_count").text("");
                $("#chapters-wrapper").hide();
                $("#examples-wrapper").hide();
                $("#books-wrapper").hide();
                $("#revisions-wrapper").hide();
                $("#download-book").hide();
                $("#submit-revision").hide();
                $("#review-link").hide();
                $("#contributor").hide();
                $("#databox-wrapper").hide();
                $.ajax({
                    url: 'get_subcategories/',
                    dataType: 'JSON',
                    type: 'GET',
                    data: {
                        maincat_id: maincat_id,
                    },
                    success: function(data) {
                        ajax_loader("clear");
                        $("#categories").html(
                            '');
                        $("#categories").html(
                            ' <option value="">Select Subcategory</option>'
                        );
                        var j = 1;
                        for (var i = 0; i <
                            data.length; i++) {
                            $('#categories').append(
                                '<option value="' +
                                data[i].subcategory_id +
                                '">' + j + ' - ' +
                                data[i].subcategory +
                                '</option>'
                            );
                            j++;
                        }
                    }
                });
            } else {
                ajax_loader("clear");
                $("#example_views_count").text("");
                editor.setValue("");
                result.setValue("");
                $("#categories").html("");
                $("#category-wrapper").hide();
                $("#review-link").hide();
                $("#books-wrapper").hide();
                $("#chapters-wrapper").hide();
                $("#examples-wrapper").hide();
                $("#revisions-wrapper").hide();
                $("#download-book").hide();
                $("#diff-wrapper").hide();
                $("#databox-wrapper").hide();
            }
        });
    /*******************************************/
    /*******************************************/
    /**************** sub categories change ********/
    /*******************************************/
    $(document.body).on("change", "#categories", function() {
        ajax_loader(this);
        var maincat_id = $('#main_categories').find(
            ":selected").val();
        var subcat_id = $('#categories').find(
            ":selected").val();
        if (subcat_id != 0) {
            $("#books-wrapper").show();
            $("#books").html("");
            editor.setValue("");
            result.setValue("");
            $("#example_views_count").text("");
            $("#chapters-wrapper").hide();
            $("#examples-wrapper").hide();
            $("#revisions-wrapper").hide();
            $("#download-book").hide();
            $("#submit-revision").hide();
            $("#review-link").hide();
            $.ajax({
                url: 'get_books/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    maincat_id: maincat_id,
                    cat_id: subcat_id,
                },
                success: function(data) {
                    ajax_loader("clear");
                    $("#books").html('');
                    $("#books").html(
                        ' <option value="">Select Book</option>'
                    );
                    if(data.length ==0){
                        alert("No book available in this subcategory");
                        $("#contributor").hide();
                    }
                    var j = 1;
                    for (var i = 0; i <
                        data.length; i++) {
                        $('#books').append(
                            '<option value="' +
                            data[i].id +
                            '">' + j + ' - '+
                            data[i].book +
                            ' (by ' +
                            data[i].author +
                            ' )' +
                            '</option>'
                        );
                        j++;
                    }
                }
            });
        } else {
            ajax_loader("clear");
            $("#example_views_count").text("");
            editor.setValue("");
            result.setValue("");
            $("#review-link").hide();
            $("#books-wrapper").hide();
            $("#chapters-wrapper").hide();
            $("#examples-wrapper").hide();
            $("#revisions-wrapper").hide();
            $("#download-book").hide();
            $("#diff-wrapper").hide();
            $("#contributor").hide();
        }
    });
    /*******************************************/
    /*******************************************/
    /**************** book change **************/
    /*******************************************/
    $(document.body).on("change", "#books", function() {
        var book_id = $('#books').find(":selected").val();
        ajax_loader(this);
        $("#chapters-wrapper").show();
        if (book_id != 0) {
            $("#download-book").show();
            $("#contributor").show();
            $("#chapters-wrapper").show();
            editor.setValue("");
            result.setValue("");
            $("#example_views_count").text("");
            $("#examples-wrapper").hide();
            $("#revisions-wrapper").hide();
            $("#download-chapter").hide();
            $("#submit-revision").hide();
            $("#review-link").hide();
            $.ajax({
                url: 'get_chapters/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    book_id: book_id,
                },
                success: function(data) {
                    ajax_loader("clear");
                    $("#chapters").html(
                        '');
                    $("#chapters").html(
                        ' <option value="">Select Chapter</option>'
                    );
                    if(data.length ==0){
                        alert("Chapter is not available from this book for R on cloud, Please try another book/chapter");
                    }
                    for (var i = 0; i <
                        data.length; i++) {
                        $('#chapters').append(
                            '<option value="' +
                            data[i].id +
                            '">' +
                            data[i].number +
                            ' - ' +
                            data[i].chapter +
                            '</option>'
                        );
                    }
                }
            });
        } else {
            ajax_loader("clear");
            $("#example_views_count").text("");
            $("#chapters-wrapper").hide();
            $("#download-book").hide();
            $("#examples-wrapper").hide();
            $("#revisions-wrapper").hide();
            editor.setValue("");
            result.setValue("");
            $("#submit-revision").hide();
            $("#contributor").hide();
            $("#review-link").hide();
            $("#diff-wrapper").hide();
        }
    });
    /*******************************************/
    /*******************************************/
    /************ chapter change ***************/
    /*******************************************/
    $(document.body).on("change", "#chapters", function() {
        ajax_loader(this);
        var chapter_id = $('#chapters').find(
            ":selected").val();
        $("#examples-wrapper").show();
        if (chapter_id != 0) {
            $("#examples-wrapper").show();
            $("#download-chapter").show();
            editor.setValue("");
            result.setValue("");
            $("#example_views_count").text("");
            $("#revisions-wrapper").hide();
            $("#download-example").hide();
            $("#review-link").hide();
            $.ajax({
                url: 'get_examples/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    chapter_id: chapter_id,
                },
                success: function(data) {
                    ajax_loader("clear");
                    $("#examples").html(
                        ' <option value="">Select Example</option>'
                    );
                    if(data.length ==0){
                        alert("Example is not available from this chapter for R on cloud, Please try another book/chapter/example");
                    }
                    for (var i = 0; i <
                        data.length; i++) {
                        $('#examples').append(
                            '<option value="' +
                            data[i].id +
                            '">' +
                            data[i].number +
                            ' - ' +
                            data[i].caption +
                            '</option>'
                        );
                    }
                }
            });
        } else {
            ajax_loader("clear");
            $("#example_views_count").text("");
            $("#download-chapter").hide();
            $("#examples-wrapper").hide();
            $("#revisions-wrapper").hide();
            editor.setValue("");
            result.setValue("");
            $("#submit-revision").hide();
            $("#review-link").hide();
            $("#diff-wrapper").hide();
        }
    });
    /*******************************************/
    /*******************************************/
    /************ Example change **************/
    /*******************************************/
    $(document.body).on("change", "#examples", function() {
        ajax_loader(this);
        var example_id = $('#examples').find(
            ":selected").val();
        //$("#revisions-wrapper").html("");
        $("#download-example").show();
        if (example_id != 0) {
            $("#example_views_count").text("");
            $("#revisions-wrapper").show();
            $("#download-example").show();
            $("#submit-revision").show();
            $("#databox-wrapper").hide();
            editor.setValue("");
            result.setValue("");
            ajax_loader('#revisions');
            $.ajax({
                url: 'get_revisions/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    example_id: example_id,
                },
                success: function(data) {
                    var ex_id = example_id;
                    $.ajax({
                        url: 'update_view_count/',
                        dataType: 'JSON',
                        type: 'GET',
                        data: {
                            ex_id: ex_id,
                        },
                        success: function(data1) {
                            $("#example_views_count").text(data1);
                        }
                    });
                    $("#revisions").html(
                        ' <option value="">Select a revision</option>'
                    );

                    var i = 1;
                    $.each(data, function(key, value){
                        $.each(value, function(key, value){
                        $('#revisions').append(
                                '<option value="' + value[1] + '"> ' +
                                i + ' - ' + value[0]+
                                '</option>'
                        );
                        i++;
                        });
                    });
                    $("#revisions-diff").html(
                        ' <option value="">Select a revision</option>'
                    );
                    var i = 1;
                    $.each(data, function(key, value){
                        $.each(value, function(key, value){
                        $('#revisions-diff').append(
                                '<option value="' + value[1] + '"> ' +
                                i + ' - ' + value[0]+
                                '</option>'
                        );
                        i++;
                        });
                    });
                    $(
                        '#revisions option:eq(1)'
                    ).prop(
                        'selected',
                        true);
                    $.ajax({
                        url: 'get_code/',
                        dataType: 'JSON',
                        type: 'GET',
                        data: {
                            commit_sha: $('#revisions').val(),
                            example_id: example_id,
                        },
                        success: function(data) {
                            if (data.review != 0) {
                                $("#review").show();
                                $("#review").attr("href", data.review_url);
                                $("#review").text(data.review + " " + "Review");
                            } else {
                                $("#review").hide();
                            }
                            $("#example_views_count").text(data.exmple);
                            editor.setValue(data.code);
                            initial_code = editor.getValue();
                            ajax_loader("clear");
                        }
                    });
                }
            });
        } else {
            ajax_loader("clear");
            $("#example_count").text("");
            $("#revisions-wrapper").hide();
            $("#download-example").hide();
            $("#submit-revision").hide();
            editor.setValue("");
            result.setValue("");
            $("#diff-wrapper").hide();
            $("#databox-wrapper").hide();
        }
    });
    /********************************************/
    /********************************************/
    /********** revision-change ************/
    /********************************************/
    $(document.body).on("change", "#revisions", function(e) {
        ajax_loader(this);
        $("#revisions-two").hide()
        var example_id = $('#examples').find(
            ":selected").val();
        if ($(this).val()) {

            $.ajax({
                url: 'get_code/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    commit_sha: $('#revisions').val(),
                    example_id: example_id,
                },
                success: function(data) {
                    ajax_loader("clear");
                    if (data.review != 0) {
                        $("#review").show();
                        $("#review").attr("href", data.review_url);
                        $("#review").text(data.review + " " + "Review");
                    } else {
                        $("#review").hide();
                    }
                    editor.setValue(data.code);
                    initial_code = editor.getValue();
                }
            });



            // show revision submit button when a revision is loaded
            $("#submit-revision").show();
            $("#revisions-two").show();
        }
    });
    /********************************************/
    /********************************************/
    /********** revision-diff change ************/
    /********************************************/
    $(document).on("change", "#revisions-diff", function(e) {
        var revName = $("#revisions-diff").find(
            ":selected").text();
        var example_id = $('#examples').find(
            ":selected").val();
        if ($(this).val()) {
            ajax_loader(this);
            $.ajax({
                url: 'get_diff/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    diff_commit_sha: $(
                        '#revisions').val(),
                    example_id: example_id,
                },
                success: function(data) {
                    ajax_loader("clear");
                    $("#diff_wrapper").modal('show');
                    $("#diff-area").html(
                        diffString(
                            editor.getValue(),
                            data.code2
                        ));
                    $("#diff-first").html(
                        'editor code'
                    );
                    $("#diff-second").html(
                        revName);
                    editor.setValue(data.code2);
                    initial_code = editor
                        .getValue()
                }
            });
        }
    });
    /********************************************/
    /********************************************/
    /******** Execute the code ******************/
    /********************************************/
    $plotbox_wrapper = $("#plotbox_wrapper");
    $plotbox = $("#plotbox");

    $(document).on("click", "#execute", function() {
        checkserver();
        if(editor.getValue() != ""){
        ajax_loader(this);
        $("#execute-inner").html("Executing...");
        var send_data = {
            token: $(
                "[name='csrfmiddlewaretoken']"
            ).val(),
            user_id: $("#user_id").val() || 0,
            R_file_id: $("#R_file_id").val() || 0,
            code: editor.getValue(),
            book_id: $("#books").val() || 0,
            chapter_id: $("#chapters").val() || 0,
            example_id: $("#examples").val() || 0
        };
        $.post("/execute-code", send_data,
            function(data) {
                var exists;
                $("#execute-inner").html(
                    '<i class="fa fa-play-circle" aria-hidden="true"></i> Execute <i class="fa fa-cogs" aria-hidden="true"></i>');
                ajax_loader('clear');
                if (data.error.length != 0)
                {
                    alert(data.error);
                }
                else{
                    result.setValue(data.output);
                    if(data.plot_exist =='True'){
                                $plot = $("<img>");
                                $plot.attr({
                                    src: data.plot_path,
                                    width: '100%'
                                });
                                $plotbox.html($plot);
                                $plotbox_wrapper.modal('show');
                                var dt = new Date().getTime();
                                $("#plot_download").show();
                                $("#plot_download").attr(
                                    "download", dt +
                                    '.png');
                                $("#plot_download").attr(
                                    "href", data.plot_path
                                );
                    }
                }
            });
        }else{
        alert("Write a R code for execution.");
        }
    });
    /********************************************/
    /********************************************/
    /****** Download book, chapter, example *****/
    /********************************************/
    $(document).on("click", "#download-book", function(e) {
        window.location =
            "https://r.fossee.in/textbook-companion/download/book/" + $(
                "#books").val();
        e.preventDefault();
    });

    $(document).on("click", "#download-chapter", function(e) {
        window.location =
            "https://r.fossee.in/textbook-companion/download/chapter/" +
            $("#chapters").val();
        e.preventDefault();
    });

    $(document).on("click", "#download-example", function(e) {
        window.location =
            "https://r.fossee.in/textbook-companion/download/example/" +
            $("#examples").val();
        e.preventDefault();
    });
    /********************************************/
    /********************************************/
    /****** Get contributor *********************/
    /********************************************/
    $(document).on("click", "#contributor", function(e) {
        $.ajax({
            url: 'get_contributor/',
            dataType: 'JSON',
            type: 'GET',
            data: {
                book_id: $("#books").val()
            },
            success: function(data) {

                $('#full_name').html(data
                    .contributor_name
                );
                $('#faculty').html(data.proposal_faculty);
                $('#reviewer').html(data.proposal_reviewer);
                $('#university').html(
                    data.proposal_university
                );
                $("#contributor_wrapper").modal('show');
            }
        });
        e.preventDefault();
    });
    /********************************************/
    /********************************************/
    /****** Bug form handling *******************/
    /********************************************/
    $(document).on("click", "#bug", function(e) {
        alert("This form is under development");
        $("#bug_form_wrapper").modal('hide');
        return false;
        $.ajax({
            url: 'get_bug_form/',
            dataType: 'JSON',
            type: 'GET',
            data: {
                bug_form: 'bug_form_pop'
            },
            success: function(data) {
                $('#bug_form_wrapper').html(
                    data);
                $("#bug_form_wrapper").modal('show');
                /**************** math captcha for form ************************/
                //create initial sum
                createSum();
                // On "reset button" click, generate new random sum
                $('button[type=reset]').click(createSum);
                // On user input, check value
                $( "#ans" ).keyup(checkInput);
/*********************************************************/
            }
        });
        e.preventDefault();
    });
    /********************************************/

    $(document.body).on("click", "#bug-form-submit", function(e) {
        ajax_loader(this);
        var token = $('input[name="csrfmiddlewaretoken"]').prop('value');
        ex_id = $("#examples").val();
        cat_id = $("#categories").val();
        book_id = $("#books").val();
        chapter_id = $("#chapters").val();
        issue_id = $("#id_issue").val();
        id_description_wrapper = $.trim($("#id_description").val());
        id_email = $.trim($("#id_email").val());
        if (issue_id == 0 || id_description_wrapper.length == 0 || id_email.length == 0) {
            if (issue_id == 0) {
                $('#id_issue').css({
                    "border": '#FF0000 1px solid'
                });
                alert("Please select any issues");
            } else if (id_description_wrapper.length == 0) {
                $('#id_issue').css({
                    "border": '#FF0000 1px solid'
                });
                alert("Please insert issue description");
            } else if (id_email.length == 0) {
                $('#id_email').css({
                    "border": '#FF0000 1px solid'
                });
                alert("Please insert email id");
            } else {
                if (!ex_id) {
                    ex_id = "NULL";
                }
            }
        } else {


            $.ajax({
                url: 'get_bug_form_submit/',
                dataType: 'JSON',
                type: 'POST',
                data: {
                    'csrfmiddlewaretoken': token,
                    form: $("#bug-form").serialize(true),
                    cat_id: cat_id,
                    book_id: book_id,
                    chapter_id: chapter_id,
                    ex_id: ex_id,
                    description: id_description_wrapper,
                    issue: issue_id,
                    email: id_email,
                },
                success: function(data) {
                    alert(data);
                    ajax_loader("clear");
                    $("#bug_form_wrapper").modal('toggle');
                }
            });
        }

        e.preventDefault();
    });
    /********************************************/
    /********************************************/
    /************ submit revision handling ******/
    /********************************************/
    $(document).on("click", "#submit-revision", function(e) {


        $.ajax({
            url: 'get_submit_revision_form/',
            dataType: 'JSON',
            type: 'GET',
            data: {
                code: editor.getValue(),
                initial_code: initial_code
            },
            success: function(data) {
                $(
                    "#submit-revision-wrapper"
                ).html(data);
                $(
                    "#submit-revision-wrapper"
                ).lightbox_me({
                    centered: false
                });
            }
        });
        e.preventDefault();
    });
    /********************************************/
    /********************************************/
    /********* submit revision form submit ******/
    /********************************************/
    $(document).on("click", "#revision-form-submit", function(
        e) {
        ajax_loader(this);

        $.ajax({
            url: 'get_submit_revision_form_submit/',
            dataType: 'JSON',
            type: 'GET',
            data: {
                form: $('#revision-form').serialize(
                    true),
                code: editor.getValue(),
            },
            success: function(data) {
                initial_code = editor.getValue()
                alert(data);
                $(
                    "#submit-revision-wrapper"
                ).trigger("close");
            }
        });
    });
    /********************************************/
    /********************************************/
    /********************************************/
    /********* search feature *******************/
    /********************************************/
    $(document).on("change", "input[type=radio][name=optradio]", function() {
        if (this.value == 'bybook') {
            $("#searched_code").hide();
            $("#searched_book").show();
        }
        else if (this.value == 'bycode') {
            $("#searched_code").show();
            $("#searched_book").hide();
        }
    });
    /********************************************/
    $(document).on("click", "#search", function() {
        ajax_loader(this);
        var search_string = jQuery.trim($("#search-input").val());
        if(search_string != ''){
        if($("input[name='optradio']:checked").val() == 'bybook'){
        $("#relevant").html('');
        if (search_string == '') {
            search_string = 'Null';
        }
        $.ajax({
                url: 'search_book',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    search_string: search_string,
                },
                success: function(data) {
                    if(data.length > 0 ){
                    $("#relevant").html('<h2>Relevant</h2><hr>');
                    for (var i = 0; i < data.length; i++) {
                        $("#relevant").append(
                            '<a  href="?book_id=' + data[i].id + '" class=""><i class="fa fa-book" aria-hidden="true"></i>' + data[i].book +
                            ' (Author: ' + data[i].author + ')</a><hr>');
                   
                    }
                    }else{
                    $("#relevant").append('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Oops! This book is not availabe!');
                    }
                    ajax_loader("clear");
                }
            }),
            $.ajax({
                url: 'search_book/popular/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    search_string: search_string,
                },
                success: function(data) {
                    $("#popular").html('<h2>Popular</h2><hr>');
                    for (var i = 0; i < data.length; i++) {
                        $("#popular").append(
                            '<a  href="?book_id=' + data[i].ids + '" class=""><i class="fa fa-book" aria-hidden="true"></i>' + data[i].book +
                            ' (Author: ' + data[i].author + ')</a><hr>');
                    }
                    ajax_loader("clear");
                }
            }),
            $.ajax({
                url: 'search_book/recent/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    search_string: search_string,
                },
                success: function(data) {
                    $("#recent").html('<h2>Recent</h2><hr>');
                    for (var i = 0; i < data.length; i++) {
                        $("#recent").append(
                            '<a  href="?book_id=' + data[i].ids + '" class=""><i class="fa fa-book" aria-hidden="true"></i>' + data[i].book +
                            ' (Author: ' + data[i].author + ')</a><hr>');
                    }
                }
            });
            } else{
                ajax_loader(this);
                 $.ajax({
                    url: 'search_in_code/',
                    dataType: 'JSON',
                    type: 'GET',
                    data: {
                        search_string: search_string,
                    },
                    success: function(data) {
                    if(data.error != 'True'){
                         console.log(data.data);
                         $("#searched_code_data").html("");
                         $("#searched_code").html(data.data);
                    }else{
                         alert("Oops! Search engine is away, please try after some time!")
                        }
                    }
                });
                ajax_loader("clear");
            }
            }else{
                alert("Please enter the search string!");
            }
                ajax_loader("clear");
    });

    $(document).on("click", "#search_book", function(e) {
        ajax_loader("#search");
        $("#popular").html('');
        $("#recent").html('');
        var search_string = 'popular';
        if (search_string == '') {
            search_string = 'Null';
        }
        $.ajax({
                url: 'search_book/popular/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    search_string: search_string,
                },
                success: function(data) {
                    $("#popular").html('<h2>Popular</h2><hr>');
                    for (var i = 0; i < data.length; i++) {
                        $("#popular").append(
                            '<a  href="?book_id=' + data[i].id + '" class=""><i class="fa fa-book" aria-hidden="true"></i>' + data[i].book +
                            ' (Author: ' + data[i].author + ')</a><hr>');
                    }
                    ajax_loader("clear");
                }
            }),
            $.ajax({
                url: 'search_book/recent/',
                dataType: 'JSON',
                type: 'GET',
                data: {
                    search_string: search_string,
                },
                success: function(data) {
                    $("#recent").html('<h2>Recent</h2><hr>');
                    for (var i = 0; i < data.length; i++) {
                        $("#recent").append(
                            '<a  href="?book_id=' + data[i].id + '" class=""><i class="fa fa-book" aria-hidden="true"></i>' + data[i].book +
                            ' (Author: ' + data[i].author + ')</a><hr>');
                    }
                    ajax_loader("clear");
                }
            });
        e.preventDefault();
    ajax_loader("clear");
    });

    $(document).on("click", "#fileuploadsubmit", function() {
    if( document.getElementById("fileSelect").files.length == 0 ){
        alert("No files selected");
    }else{
        if(confirm("Uploaded file last only till sesstion. Use direct file name for execution.")){
            var name = doSubmit();
            $("<span>" + name + "</span>").insertAfter("#uploaddataset");
            $("#uploaddatasetModal").modal('hide');
            $("#uploaddataset").hide();
        }
        else{
            return false;
        }
    }
    });

    $(document).on("click", "#reset", function() {
         $.ajax({
                url : "reset/",
                dataType: 'JSON',
                type: 'GET',
                data:{ reset: '1' },
                
                success : function (data) {
                    document.location.reload(true);
                },
                beforeSend:function(){
                     return confirm("Are you sure you want to reset? Reset will clear of your data/uploaded file.");
                },
            });

    });

}); //document.readOnly()

function doSubmit(){
    // Form Data
    var formData = new FormData();
    var fileSelect = document.getElementById("fileSelect");
    if(fileSelect.files && fileSelect.files.length == 1){
        var file = fileSelect.files[0]
        formData.set("file", file , file.name);
        var user_id = document.getElementById("user_id");
        formData.set("user_id", user_id.value);
        formData.set("X-Api-Key", key);

    var request = new XMLHttpRequest();

    request.open('POST', api_url_upload);
    request.send(formData);
    return (fileSelect.files[0].name);
    }
}

function checkserver(){
    $.ajax({url: 'check_server/',
            dataType: "json",
            success : function (data) {
                if((data.status == 200) || (data.error != 'True')){
                }else{
                        alert("R cloud server is not available, please try after some time");
                    }
               }
     });
}

