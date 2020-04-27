$(document).ready(function () {

    M.AutoInit();
    $(document).ready(function () {
        $('select').formSelect();
    });

    $('#textarea1').val('New Text');
    M.textareaAutoResize($('#textarea1'));


    //Build in Javascript that allows dropdown option to determine what text will go into text area

    $('#organization-search').on('change', function() {
        $('#textarea1').val($('#organization-search option:selected').val());
    });

    //Build in Javascript for Charity Navigator API calls, based on name, city, state or keyword

    function search(input) {
        $('.large').html(' ');

    var url = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=f23e3059&app_key=e0734aa01e43908655ef9c264f6dcf2e&pageSize=10&search=food&state=NC&city=raleigh'

    //Build in Javascript for API call to coincide with search parameters 

    //Build in Javascript for card to display charity information based on API call

    // Build in functionality so that user can click link to go to organization's home page

    };

});