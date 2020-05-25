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
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
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
} // End of newFunction();

// -------------------Home.ejs-----------------------

    // GROW SHADOW EFFECT ON COURSE SECTION
    $("#course2 .card").addClass("hvr-grow-shadow");

    // SHRINK EFFECT ON CATEGORY SECTION
    $("#category2 .card").addClass("hvr-shrink");

    // SCROLL EFFECT FOR EACH SECTION
    $(document).ready(function(){
        $(".navbar-nav .nav-item a").on('click', function(event) {
          if (this.hash !== "") {
            // event.preventDefault();
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
    var pathUrl = window.location.pathname;
    console.log(pathUrl);
    if(pathUrl == '/'){
        $("#nv1").show();
        $("#nv2").show();
    } else {
        $("#nv1").hide();
        $("#nv2").hide();
    }