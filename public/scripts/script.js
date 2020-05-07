// ------------Supervisor.ejs------------------
newFunction();
function newFunction() {
    $(document).ready(function () {
        
        //Search input dropdown
        
        $('.search-bar').hide();
        $('.search-filter').click(function () {
            $('.search-bar').toggle(400);
        });

        // Form dropdown
        
        $('.dropDown').hide();
        $('.drop-down-btn').click(function () {
            $('.dropDown').toggle(700);
        });

        //Search Filter 

        $(".search-bar input").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $(".myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            });
        });

    });

    // INCLUDE ADD/REMOVE FOR FOE
    $(function(){
    $(document).on('click', '.btn-add', function(e){
        e.preventDefault();
        var controlForm = $('.controls .form-group:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).prependTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<i class="fas fa-minus"></i>');
    }).on('click', '.btn-remove', function(e){
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
                newacademicEntry = $(academicEntry.clone()).prependTo(academicForm);

                newacademicEntry.find('input').val('');
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
                newexperienceEntry = $(experienceEntry.clone()).prependTo(experienceForm);

                newexperienceEntry.find('input').val('');
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
                newresearchEntry = $(researchEntry.clone()).prependTo(researchForm);

                newresearchEntry.find('input').val('');
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

// -------------------Home.ejs-----------------------
    $(function () {
        $(document).scroll(function () {
            var $nav = $("#mainNavbar");
            $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
        });
    });

    $(document).ready(function(){
        $('.scroll-left-200').scrollSlide({
            direction   : 'left',
            scrollstart : 200
        });

        $('.scroll-right-200').scrollSlide({
            direction   : 'right',
            scrollstart : 200
        });

        $('.scroll-left-600').scrollSlide({
            direction   : 'left',
            scrollstart : 600
        });

        $('.scroll-right-600').scrollSlide({
            direction   : 'right',
            scrollstart : 600
        });
        $('.scroll-left-800').scrollSlide({
            direction   : 'left',
            scrollstart : 800
        });

        $('.scroll-right-800').scrollSlide({
            direction   : 'right',
            scrollstart : 800
        });

        $('.scroll-left-1100').scrollSlide({
            direction   : 'left',
            scrollstart : 1100
        });

        $('.scroll-right-1100').scrollSlide({
            direction   : 'right',
            scrollstart : 1100
        });
    });

    $(document).ready(function() { 
        $(document.querySelectorAll("#animate")).click(function() { 
            $(".scroll-right-200").stop(true,true).fadeIn();
            $(".scroll-left-200").stop(true,true).fadeIn();
            $(".scroll-left-600").stop(true,true).fadeIn();
            $(".scroll-right-600").stop(true,true).fadeIn();
            $(".scroll-left-800").stop(true,true).fadeIn();
            $(".scroll-right-800").stop(true,true).fadeIn();
            $(".scroll-left-1100").stop(true,true).fadeIn();
            $(".scroll-right-1100").stop(true,true).fadeIn();
            $("html, body").animate({ 
                scrollTop: $( 
                  'html, body').get(0).scrollHeight 
            },2000); 
        }); 
    }); 
}

//display name of file on file upload

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