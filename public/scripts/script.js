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

    // Include add/remove button for Field of Expertise.
    $(function(){
    $(document).on('click', '.btn-foe-add', function(e){
        e.preventDefault();
        var controlForm = $('.controls .form-group:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        currentEntry.find('input').val('');
        controlForm.find('.entry:not(:first) .btn-foe-add')
            .removeClass('btn-foe-add').addClass('btn-foe-remove')
            .removeClass('btn-secondary').addClass('btn-danger')
            .html('<i class="fas fa-minus"></i>');
    }).on('click', '.btn-foe-remove', function(e){
		$(this).parents('.entry:first').remove();
		e.preventDefault();
		return false;
	    });
    });

    // Add multiple research field

    $(function(){
        $(document).on('click','.btn-research-add', function(e){
            e.preventDefault();
            var researchForm = $('.research-form');
                researchEntry = $(this).parents('.research-entry:first');
                newResearchEntry = $((researchEntry.clone()).appendTo(researchForm));
            
            newResearchEntry.find('input').val('');
            researchForm.find('.research-entry:not(:last) .btn-research-add')
                .removeClass('btn-research-add').addClass('btn-research-remove')
                .removeClass('btn-secondary').addClass('btn-danger')
                .html('<i class="fas fa-minus"></i>');
        }).on('click', '.btn-research-remove', function(e){
            $(this).parents('.research-entry:first').remove();
            e.preventDefault();
            return false;
        });
    });

    //Add multiple experience field

    $(function(){
        $(document).on('click','.btn-experience-add', function(e){
            e.preventDefault();
            var experienceForm = $('.experience-form');
                experienceEntry = $(this).parents('.experience-entry:first');
                newExperienceEntry = $((experienceEntry.clone()).appendTo(experienceForm));
            
            newExperienceEntry.find('input').val('');
            experienceForm.find('.experience-entry:not(:last) .btn-experience-add')
                .removeClass('btn-experience-add').addClass('btn-experience-remove')
                .removeClass('btn-secondary').addClass('btn-danger')
                .html('<i class="fas fa-minus"></i>');
        }).on('click', '.btn-experience-remove', function(e){
            $(this).parents('.experience-entry:first').remove();
            e.preventDefault();
            return false;
        });
    });


    //Add multiple academic field


    $(function(){
        $(document).on('click','.btn-academic-add', function(e){
            e.preventDefault();
            var academicForm = $('.academic-form');
                academicEntry = $(this).parents('.academic-entry:first');
                newAcademicEntry = $((academicEntry.clone()).appendTo(academicForm));
            
            newAcademicEntry.find('input').val('');
            academicForm.find('.academic-entry:not(:last) .btn-academic-add')
                .removeClass('btn-academic-add').addClass('btn-academic-remove')
                .removeClass('btn-secondary').addClass('btn-danger')
                .html('<i class="fas fa-minus"></i>');
        }).on('click', '.btn-academic-remove', function(e){
            $(this).parents('.academic-entry:first').remove();
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