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
    $(document).on('click', '.btn-add', function(e){
        e.preventDefault();
        var controlForm = $('.controls .form-group:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

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
