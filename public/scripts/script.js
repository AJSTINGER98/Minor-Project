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

    $(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
            e.preventDefault();

        var controlForm = $('.controls .form-group:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<i class="fas fa-minus"></i>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	});
});

}
