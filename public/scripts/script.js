newFunction();

function newFunction() {
    $(document).ready(function(){
        $('.search-bar').hide();
        $('.search-filter').click(function () {
            $('.search-bar').toggle(700);
        });
    });
}
