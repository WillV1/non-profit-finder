$(document).ready(function () {

    var searchVal;

    M.AutoInit();
    $(document).ready(function () {
        $('select').formSelect();
    });
    M.textareaAutoResize($('#textarea1'));


    //Build in Javascript that allows dropdown option to determine what text will go into text area

    var myTextBox = $('#textarea1');
    var myDropDown = $('#organization-search');

    myDropDown.on('change', function(){
         searchVal = ($(this).val()); 
        console.log($(this).val())
    })    


    //Build in Javascript for Charity Navigator API calls, based on name, city, state or keyword
    $('#button').on('click', function(event){
        event.preventDefault();
        var searchParam = myTextBox.val();
        search(searchVal, searchParam);
    })

    function search(searchVal, searchParam) {
        $('.large').html(' ');

        var baseURL = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=f23e3059&app_key=e0734aa01e43908655ef9c264f6dcf2e'
        var endingURL;

        if (searchVal == 'city'){
           endingURL = '&city=' + searchParam;
        } else {
            endingURL = '&search=' + searchParam;
        }


        //Build in Javascript for API call to coincide with search parameters 

        $.ajax({
            url: baseURL + endingURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });


        //Build in Javascript for card to display charity information based on API call


        // Build in functionality so that user can click link to go to organization's home page

    };

});