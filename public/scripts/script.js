// Global Declaration path Url.

// ------------Supervisor.ejs------------------
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
        $(document).on('click','.addRP',function(e){
            e.preventDefault();
            var researchForm = $('.research'),
                researchEntry = $(this).parents('.researchField'),
                newresearchEntry = $(researchEntry.clone()).appendTo(researchForm);

                newresearchEntry.find('input').val('None');
                newresearchEntry.find('select').val('');
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

    /* REMOVE NAVBAR DROPDOWN ON MOBILE VIEW  */

    $(document).ready(function(){
        
        if($(window).width() <= 976){
            $('#navbarDropdownMobile').show();
            $('#navbarDropdownWeb').hide();
            $("#myNavLinkItem a").removeClass('effect');
            
        } else {
            $('#navbarDropdownMobile').hide();
            $('#navbarDropdownWeb').show();
            $("#myNavLinkItem a").addClass('effect');
        }
        $(window).resize(function() {

            if ($(this).width() <= 976) {
                $('#navbarDropdownMobile').show();
                $('#navbarDropdownWeb').hide();
                $("#myNavLinkItem a").removeClass('effect');
            } else {
                $('#navbarDropdownMobile').hide();
                $('#navbarDropdownWeb').show();
                $("#myNavLinkItem a").addClass('effect');
              } 
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
    } else {
        $("#nv1").hide();
        $("#nv2").hide();
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
        var wbop = XLSX.write(wb, {bookType: 'xlsx', bokSST: true, type: 'binary'});

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

