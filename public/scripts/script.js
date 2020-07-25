// Global Declaration path Url.

// ------------Supervisor.ejs------------------
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

}
onPageLoad();
newFunction();
function newFunction() {
    $(document).ready(function () {

        // FORM DROPDOWN
        $('.dropDown').hide();
        $('.drop-down-btn').click(function () {
            $('.dropDown').toggle(700);
        });

        // SEARCH FILTER 
        $(".search-bar input").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".myTable tr").filter(function () {
                if($(this).text().toLowerCase().indexOf(value) > -1){
                    $(this).removeClass('d-none');
                } else{
                    $(this).addClass('d-none');
                }
            });
        });

    });

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

    // FADING EFFECT IN ALERT 

    $(document).ready( function(){

        $('.overlap-alert').css('display','none').fadeIn(1000,function(){
            setTimeout(function(){
                $('.overlap-alert').fadeOut(1000);
            },3000);
        });
         
    });

    // SLIDE EFFECT ON RESOURCE DROPDOWN
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

    // ----------------------SHOW/HIDE PASSWORD--------------------------
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

} // End of newFunction();

// -------------------Home.ejs-----------------------

    // DECLARE PATH :
    var pathUrl = window.location.pathname;
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

    // HIDE/SHOW NAVBAR ICONS
    if(pathUrl == '/'){
        $("#nv1").show();
        $("#nv2").show();
        $("#resourceDropdown").show();
    } else {
        $("#nv1").hide();
        $("#nv2").hide();
        $("#resourceDropdown").hide();
    }

    // SUPERVISOR AND SCHOLAR PAGE
    //-------------------------------------------------------------
    // MAKE TABLE ROW CLICKABLE

    $(document).ready(function(){
        $('.clickable-row').click(function() {
            window.location = $(this).data('href');
        });
    });

    // DOWNLOAD TABLE AS EXCEL 
    //------------------------------------------------------------------
    
    //CREATE AN OCTAL ARRAY BUFFER
    function stringToArrayBuffer(s){
        var buffer = new ArrayBuffer(s.length);

        var view = new Uint8Array(buffer);

        for (var i = 0; i<s.length;i++){
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        
        return buffer;
    }

    function exportexcel(x){

        //Import table object
        var myTable = document.getElementById(`${x}`);

        // Remove row with display none
        $(myTable).find('tr').each(function(){
            if($(this).hasClass('d-none')){
                $(this).remove();
            }
        });
        
        // Create workbook of the table
        var wb = XLSX.utils.table_to_book(myTable,{sheet: `${x}`});

        //Convert the workbook to binary output
        var wbop = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'binary'});

        //Download excel file
        saveAs(new Blob([stringToArrayBuffer(wbop)],{type: 'application/octet-stream'}),`${x}.xlsx`);

    }
    //--------------------------------------------------------------

    //REMOVE FOOTER AND NAV LINKS IN CHANGE PASSWORD PAGE

    if(pathUrl == '/changepassword'){
        $('#footer').hide();
        $("#mainNavbar ul li a").hide();
        $("#mainNavbar ul li a").first().show();
        $("#mainNavbar ul li a").first().css({
            marginRight: "13em"
        });    
    }

    //Convert excel file to json 

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
                }
            });
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
        $('#scholarTable th, #supervisorTable th').click(function() {
            $("i", this).toggleClass("fas fa-caret-down fa-sm fas fa-caret-up fa-sm");
        });
    });


    

  
