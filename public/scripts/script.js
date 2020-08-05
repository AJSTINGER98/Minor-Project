// Global Declaration path Url.

// -------------- Functionalities For Each Page ---------------- //
function onPageLoad(){
    $(window).on('load', function(){
        setTimeout(() =>{
            $('.page-loader').css('display','none');
            $('.page').css('visibility','visible');
        },1000);
    });

    /* REMOVE NAVBAR DROPDOWN ON MOBILE VIEW  */

    $(document).ready(function(){
        
        if($(window).width() <= 976){
            $('#navbarDropdownMobile').show();
            $('#navbarDropdownWeb').hide();
            $("#myNavLinkItem a").removeClass('effect');
            $("#supervisorTable th:nth-of-type(1)")
                .html('Sup ID<i class="fas fa-caret-down fa-sm">')
                .css({'white-space':'nowrap',});
            $("#scholarTable th:nth-of-type(1)")
                .html('Sch ID<i class="fas fa-caret-down fa-sm">')
                .css({'white-space':'nowrap',});
            $("#course2 .card").removeClass("hvr-grow-shadow");
        } else {
            $('#navbarDropdownMobile').hide();
            $('#navbarDropdownWeb').show();
            $("#myNavLinkItem a").addClass('effect');
            $("#supervisorTable th:nth-of-type(1)")
                .html('Supervisor ID<i class="fas fa-caret-down fa-sm">');
            $("#scholarTable th:nth-of-type(1)")
                .html('Scholar ID<i class="fas fa-caret-down fa-sm">');
            $("#course2 .card").addClass("hvr-grow-shadow");
        }
        $(window).resize(function() {

            if ($(this).width() <= 976) {
                $('#navbarDropdownMobile').show();
                $('#navbarDropdownWeb').hide();
                $("#myNavLinkItem a").removeClass('effect');
                $("#supervisorTable th:nth-of-type(1)")
                    .html('Sup ID<i class="fas fa-caret-down fa-sm">')
                    .css('white-space','nowrap');
                $("#scholarTable th:nth-of-type(1)")
                    .html('Sch ID<i class="fas fa-caret-down fa-sm">')
                    .css({'white-space':'nowrap',});
                $("#course2 .card").removeClass("hvr-grow-shadow");
            } else {
                $('#navbarDropdownMobile').hide();
                $('#navbarDropdownWeb').show();
                $("#myNavLinkItem a").addClass('effect');
                $("#supervisorTable th:nth-of-type(1)")
                    .html('Supervisor ID<i class="fas fa-caret-down fa-sm">');
                $("#scholarTable th:nth-of-type(1)")
                    .html('Scholar ID<i class="fas fa-caret-down fa-sm">');
                $("#course2 .card").addClass("hvr-grow-shadow");
              } 
          });
    });
}

function newFunction() {
    $(document).ready(function () {

        // FORM DROPDOWN
        $('.dropDown').hide();
        $('.drop-down-btn').click(function () {
            $('.dropDown').toggle(700);
        });

        // SEARCH FILTER 
        if(window.location.pathname == '/supervisor' || window.location.pathname == '/scholar'){
            $(".search-bar input").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                if(value.indexOf(':') == -1){
                    $(".myTable tr").filter(function () {
                        if($(this).text().toLowerCase().indexOf(value) > -1){
                            $(this).removeClass('d-none');
                        } else{
                            $(this).addClass('d-none');
                        }
                    });
 
                } else {
                    var Key = value.slice(0,value.indexOf(':')).trim().toLowerCase();
                    var Val = value.slice(value.indexOf(':')+1,value.length).trim().toLowerCase();
                    $("thead th").each(function(){
                        var index ; 
                        if($(this).text().toLowerCase() == Key){
                            index = $('th').index(this);
                            
                            $('.myTable tr').each(function(){
                                var col = $(this).find(`td:nth-child(${index+1})`);
                                if(col.text().toLowerCase().indexOf(Val) > -1){
                                    $(this).removeClass('d-none');
                                } else {
                                    $(this).addClass('d-none');
                                }

                            });
                        }
                    });
                }
            });

        }
    });
} // End of newFunction();

// Calling JS Function for Page Load
onPageLoad();
newFunction();

// ---------------- SUPERVISOR/SCHOLAR PAGE ----------------- //
    if(window.location.pathname.startsWith('/scholar') || window.location.pathname.startsWith('/supervisor')){

        $(document).ready(function (){
        
            // INCLUDE ADD/REMOVE FOR FOE
            $(function(){
                $(document).on('click', '.btn-foe-add', function(e){
                    e.preventDefault();
                    var controlForm = $('.controls .form-group:last'),
                        currentEntry = $(this).parents('.entry:last'),
                        newEntry = $(currentEntry.clone()).appendTo(controlForm);
            
                    newEntry.find('input').val('');
                    controlForm.find('.entry:not(:last) .btn-foe-add')
                        .removeClass('btn-foe-add').addClass('btn-foe-remove')
                        .removeClass('btn-secondary').addClass('btn-danger')
                        .html('<i class="fas fa-minus"></i>');
                    }).on('click', '.btn-foe-remove', function(e){
                        $(this).parents('.entry:first').remove();
                        e.preventDefault();
                        return false;
                });
            });
        
            // ADD/REMOVE SDC MEMBERS
            $(function(){
                $(document).on('click','.addSDC',function(e){
                    e.preventDefault();
                    var sdcForm = $('.sdcMember #sdc option:selected'),
                        fName   = $(`<div class = "form-row d-flex justify-content-center my-2">
                                        <div class="input-group col-md-4">
                                            <input type = "text" class = "form-control" name = "dispName">
                                            <input type = "hidden" class = "form-control" name = "scholar[sdcMember][ID][]">
                                            <span class="input-group-append">
                                                <button class="btn btn-danger btn-sdc-rem" type="button">
                                                    <i class="fas fa-minus"></i>   
                                                </button>                                       
                                            </span>
                                        </div>
                                    </div>`);
                    fName.find('input[type=text]').val(sdcForm.text());
                    fName.find('input[type=hidden]').val(sdcForm.val());
                    $('.sdcMember').append(fName);
                    $('.sdcMember select').val('None');
                    }).on('click', '.btn-sdc-rem', function(e){
                        $(this).parents('.input-group').remove();
                        // e.preventDefault();
                        return false;
                });
            });
        
            // INCLUDE ADD/REMOVE FOR ACADEMICQ FIELDS
            $(function(){
                $(document).ready(function(){
                    var academicForm = $('.academic');
                    academicForm.find('.academicField:not(:last) .addAQ')
                        .removeClass('addAQ').addClass('delAQ')
                        .removeClass('btn-success').addClass('btn-danger')
                        .html('REMOVE');
                });
                $(document).on('click','.addAQ',function(e){
                    e.preventDefault();
                    var academicForm = $('.academic'),
                        academicEntry = $(this).parents('.academicField'),
                        newacademicEntry = $(academicEntry.clone()).appendTo(academicForm);
    
                        newacademicEntry.find('input').val('');
                        newacademicEntry.find('select').val('None');
                        academicForm.find('.academicField:not(:last) .addAQ')
                        .removeClass('addAQ').addClass('delAQ')
                        .removeClass('btn-success').addClass('btn-danger')
                        .html('REMOVE');
                }).on('click','.delAQ',function(e){
                    $(this).parents('.academicField:first').remove();
                    e.preventDefault();
                    return false;
                });
            });
        
            // INCLUDE ADD/REMOVE FOR EXPERIENCE
            $(function(){
                $(document).ready(function(){
                    var experienceForm = $('.experience');
                    experienceForm.find('.experienceField:not(:last) .addEX')
                    .removeClass('addEX').addClass('delEX')
                    .removeClass('btn-success').addClass('btn-danger')
                    .html('REMOVE');        
                });
                $(document).on('click','.addEX',function(e){
                    e.preventDefault();
                    var experienceForm = $('.experience'),
                        experienceEntry = $(this).parents('.experienceField'),
                        newexperienceEntry = $(experienceEntry.clone()).appendTo(experienceForm);
    
                        newexperienceEntry.find('input').val('');
                        newexperienceEntry.find('select').val('None');
                        experienceForm.find('.experienceField:not(:last) .addEX')
                        .removeClass('addEX').addClass('delEX')
                        .removeClass('btn-success').addClass('btn-danger')
                        .html('REMOVE');
                }).on('click','.delEX',function(e){
                    $(this).parents('.experienceField:first').remove();
                    e.preventDefault();
                    return false;
                });
            });
        
            // INCLUDE ADD/REMOVE FOR RESEARCH
            $(function(){
                $(document).ready(function(){
                    var researchForm = $('.research');
                    researchForm.find('.researchField:not(:last) .addRP')
                        .removeClass('addRP').addClass('delRP')
                        .removeClass('btn-success').addClass('btn-danger')
                        .html('REMOVE');
                });
                $(document).on('click','.addRP',function(e){
                    e.preventDefault();
                    var researchForm = $('.research'),
                        researchEntry = $(this).parents('.researchField'),
                        newresearchEntry = $(researchEntry.clone()).appendTo(researchForm);
    
                        newresearchEntry.find('input').val('');
                        newresearchEntry.find('select').val('None');
                        researchForm.find('.researchField:not(:last) .addRP')
                        .removeClass('addRP').addClass('delRP')
                        .removeClass('btn-success').addClass('btn-danger')
                        .html('REMOVE');
                }).on('click','.delRP',function(e){
                    $(this).parents('.researchField:first').remove();
                    e.preventDefault();
                    return false;
                });
            });
                            
        // TABLE SORT IN SCHOLAR.EJS
        $(document).ready(function(){
            $(function() {
                $("#scholarTable").tablesorter({ 
                    sortList: [[0,0]], 
                    headers : {
                        // Zero Column Index
                        0 : { sorter: true },
                        1 : { sorter: true },
                        2 : { sorter: false },
                        3 : { sorter: false },
                        4 : { sorter: false },
                        5 : { sorter: true },
                    }
                }); 
            });
            $('#scholarTable .sorter, #supervisorTable .sorter').click(function() {
                $("i", this).toggleClass("fas fa-caret-down fa-sm fas fa-caret-up fa-sm");
                
                $('#supervisorTable').tablesorter({
                    sortList : [[0,0]],
                    headers : {
                        // Zero Column Index
                        0 : { sorter: true },
                        1 : { sorter: false },
                        2 : { sorter: false },
                        3 : { sorter: false },
                        4 : { sorter: false },
                    }
                });
            });
        });

            // MAKE TABLE ROW CLICKABLE
            $(document).ready(function(){
                $('.clickable-row').click(function() {
                    window.location = $(this).data('href');
                });
            });

            // Hover Popover
            $('#popoverData').popover();

        }); // End Document Ready
    }


    
// --------------------------- END ------------------------------ //

// -------------------------- HOME.ejs ---------------------------- //

    // DECLARE PATH :
    var pathUrl = window.location.pathname;
    if(pathUrl == '/'){

        // GROW SHADOW EFFECT ON COURSE SECTION
        $("#course2 .card").addClass("hvr-grow-shadow");
    
        // SHRINK EFFECT ON CATEGORY SECTION
        $("#category2 .card").addClass("hvr-shrink");
    
        // SCROLL EFFECT FOR EACH SECTION
        $(document).ready(function(){
            $(".navbar-nav .nav-item a").on('click', function(event) {
              if (this.hash !== "") {
                
                var hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - 50
                },1000, function(){
                    window.location.hash = hash;
                    });
                } 
            });
        });
    }

    //DISPLAY NAME OF FILES ON FILE UPLOAD(PDH FORMS)
    $("[type=file]").on("change", function(){
        // Name of file and placeholder
        var file = this.files[0].name;
        var dflt = $(this).attr("placeholder");
        if($(this).val()!=""){
        $(this).next().text(file);
        } else {
        $(this).next().text(dflt);
        }
    });

    // HIDE/SHOW NAVBAR ICONS as well as Announcements
    if(pathUrl == '/'){
        $("#nv1").show();
        $("#nv2").show();
        $("#resourceDropdown").show();
        $(".topbar").show();
    } else {
        $("#nv1").hide();
        $("#nv2").hide();
        $("#resourceDropdown").hide();
        $(".topbar").hide();
    }

    // HIDE ANNOUNCEMENT ON CLICK
    $('.topbar button').on('click', function(e) { 
        $(this).parent().remove(); 
    });

    // SLIDE EFFECT FOR COURSES (SLICK.js)
    if(window.location.pathname == '/'){

        $(document).ready(function(){
            $('.courseDisp').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnFocus: false,
                nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
                prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
                responsive: [{
                    breakpoint : 768,
                    settings :{
                        slidesToShow : 1,
                        slidesToScroll : 1,
                        autoplay :true,
                        autoplaySpeed: 2000,
                        arrows : false,
                    }
                }]
            });
        });
    }

    // SLIDE EFFECT FOR ANNOUNCEMENTS
    if(window.location.pathname == '/'){
        $(document).ready(function(){
            $('.announce').slick({
                autoplay : true,
                autoplaySpeed : 2000,
                pauseOnFocus : false,
                arrows : false
            });
        });
    }

    // INCLUDE ADD/REMOVE FOR PRESENTATION SCHEDULE
    if(window.location.pathname == '/schedule'){
        $(function(){
    
            $(document).on('click','.addSchedule',function(e){
                e.preventDefault();
                var scheduleForm = $('.schedule'),
                    scheduleEntry = $(this).parents('.scheduleField'),
                    newscheduleEntry = $(scheduleEntry.clone()).appendTo(scheduleForm);
    
                    newscheduleEntry.find('input').val('');
                    newscheduleEntry.find('select').val('None');
                    scheduleForm.find('.scheduleField:not(:last) .addSchedule')
                    .removeClass('addSchedule').addClass('delSchedule')
                    .removeClass('btn-success').addClass('btn-danger')
                    .html('REMOVE');
            }).on('click','.delSchedule',function(e){
                $(this).parents('.scheduleField:first').remove();
                e.preventDefault();
                return false;
            });
        });  
    }

    // SLIDE EFFECT ON RESOURCE DROPDOWN ----------------------------->
    $(document).ready(function(){
        // Slide Down Effect
        $('.dropdown').on('show.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
        });
        // Slide Up Effect
        $('.dropdown').on('hide.bs.dropdown', function() {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
        });
    });

    // SLIDE ANIMATION OF DROPDOWN ROW
    $( ".parent-row i" ).click(function() {
        $(this).toggleClass("down");
        $(this).parent().parent().next('.dropdown-row').toggleClass( "dropdown-row-active");
    });

    // PhD Completion Date change on DropDown Selection
    $(document).ready(function(){
        $('#phdStatus').change(function(){
            if ($(this).val() == 'true') {
                $('#compDate').css({
                    'display':'flex',
                    'justify-content' : 'center'
                });           
            } else {
                $('#compDate').css({'display':'none'}); 
            }
        });
    });

    // Show phd completion date if status == 'Completed'
    $(document).ready(function(){
        var dateVar =  $('#completeDate').val();
        if(dateVar && dateVar.length == 0){
            $('#completeDate').parent().parent().hide();
        } else {
            $('#completeDate').parent().parent().show();
        }
    });

// -------------------------- END ------------------------------- //

// -------------------- NOTIFICATION PAGE ----------------------- //
    if(pathUrl == '/notification'){
        
        // NEW NOTIFICATION
            $(document).ready(function(){
                $('.notify div a').click(function(event) {
                    var url = $(this).attr('href');
                    history.pushState(null, null, url);
                });
            
                $('#newnotification').on('hidden.bs.modal', function () {
                    history.pushState(null, null, "/notification");
                });
            });
        
        // EDIT NOTIFICATION
        $(document).ready(function(){
            $('.notify span a').click(function(event) {
                var url = $(this).attr('href');
                console.log(url);
                // Pass data to Modal
                var text = $(this).data('val').text;
                var link = $(this).data('val').link;
                // Set value attr of Input Tag
                $(".modal-body #notifyText").val(text);
                $(".modal-body #notifyLink").val(link);
                $("#editnotification form").attr('action', url.slice(0,url.length-5)+'?_method=PUT');
                history.pushState(null, null, url);
            });
        
            $('#editnotification').on('hidden.bs.modal', function () {
                history.pushState(null, null, "/notification");
            });
        });
    }

// -------------------------- END ------------------------------- //

    // FADING EFFECT IN ALERT ---------------------------------------->
    $(document).ready( function(){

        $('.overlap-alert').css('display','none').fadeIn(1000,function(){
            setTimeout(function(){
                $('.overlap-alert').fadeOut(1000);
            },3000);
        });
            
    });

    // SHOW/HIDE PASSWORD -------------------------------------------->
    if(pathUrl == '/changepassword' || pathUrl.startsWith('/reset')){
        $(function(){
            $(document).on('click','.show-icon',function(e){
                e.preventDefault();
                var ip = $(this).parents('.form-group').children('input');
                
                ip.attr('type','text');
                $(this).children('i').removeClass('fa-eye');
                $(this).children('i').addClass('fa-eye-slash');
                $(this).addClass('hide-icon');
                $(this).removeClass('show-icon');
            }).on('click','.hide-icon',function(e){
                e.preventDefault();
                var ip = $(this).parents('.form-group').children('input');
                
                ip.attr('type','password');
                $(this).children('i').removeClass('fa-eye-slash');
                $(this).children('i').addClass('fa-eye');
                $(this).addClass('show-icon');
                $(this).removeClass('hide-icon'); 
                return false;
            });
    
        });

    }

    //REMOVE FOOTER AND NAV LINKS IN CHANGE PASSWORD PAGE ----------->
    if(pathUrl == '/changepassword'){
        $('#footer').hide();
        $("#mainNavbar ul li a").hide();
        $("#mainNavbar ul li a").first().show();
        $("#mainNavbar ul li a").first().css({
            marginRight: "13em"
        });    
    }

    // --------------------------- END ----------------------------- //

    // CONVERT EXCEL FILE TO JSON ----------------------------------->
    if(window.location.pathname == '/seeds'){

        $(document).ready(function(){
    
            var uploadFile;
    
            $('#file').change(function(e){
                uploadFile = e.target.files[0];
            });
    
            $(document).on('click','.excel-btn',function(e){
                e.preventDefault();
    
                if(uploadFile && (uploadFile.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'|| uploadFile.type == ' application/vnd.ms-excel')){
                    
                    var person = $('#personSelect option:selected').val().replace(/\s/g,"").toLowerCase();
                    var fileReader = new FileReader();
                    fileReader.onload = function(e) {
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });
                        workbook.SheetNames.forEach(sheet =>{
                            let rowObject = XLSX.utils.sheet_to_row_object_array(   
                                workbook.Sheets[sheet],
                                {defval : null}
                            );
                            $.ajax({
                                url: `/seeds/upload/${person}`,
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(rowObject),
                                
                            })
                            .done(function(data){
                                if(data.status == 'success'){
                                    alert('Data Added');
                                } else {
                                    alert('Data could not be added!\n NOTE: Please make sure you are importing the right excel sheet and have the sheet in the right format');
                                }
                            });
                        });
                        
                    };
                    fileReader.readAsBinaryString(uploadFile);
                }
                else{
                    console.log('no file added or file extension not valid');
                } 
            });
        });
    }
    // --------------------------- END ----------------------------- //


    

  
