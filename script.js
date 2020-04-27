$(document).ready(function () {

    var state;
    var city;
    var keyword;

    M.AutoInit();
    $(document).ready(function () {
        $('select').formSelect();
    });

    $('#textarea1').val('New Text');
    M.textareaAutoResize($('#textarea1'));


    //Build in Javascript that allows dropdown option to determine what text will go into text area

    $('#organization-search').on('change', function () {
        $('#textarea1').val($('#organization-search option:selected').val());

        $('#textarea1').val('');

        if ($('#organization-search option:selected').val("1")) {
            var city = $('#textarea1');
            city.val($(this)[0].value);
            console.log(city);
            // } else if ($('#organization-search option:selected').val() == "2") {
            //     var state = $(this).val();
            //     console.log(state);
            // } else if ($('#organization-search option:selected').val() == "3") {
            //     var keyword = $(this).val();
            //     console.log(keyword)
            // } else {
            //     return 
        }

    });


    //Build in Javascript for Charity Navigator API calls, based on name, city, state or keyword


    function search(state, city, keyword) {
        $('.large').html(' ');

        var queryURL = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=f23e3059&app_key=e0734aa01e43908655ef9c264f6dcf2e&pageSize=10&search=' + keyword + '&state=' + state + '&city=' + city;

        //Build in Javascript for API call to coincide with search parameters 

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });


        //Build in Javascript for card to display charity information based on API call


        // Build in functionality so that user can click link to go to organization's home page

    };

});