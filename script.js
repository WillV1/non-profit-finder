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

    myDropDown.on('change', function () {
        searchVal = ($(this).val());
        console.log($(this).val())
    })


    //Build in Javascript for Charity Navigator API calls, based on name, city, state or keyword
    //Build in Javascript for API call to coincide with search parameters 
    $('#button').on('click', function (event) {
        event.preventDefault();
        var searchParam = myTextBox.val();
        search(searchVal, searchParam);
    })

    function search(searchVal, searchParam) {
        $('.large').html(' ');

        var baseURL = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=f23e3059&app_key=e0734aa01e43908655ef9c264f6dcf2e'
        var endingURL;

        if (searchVal == 'city') {
            endingURL = '&city=' + searchParam;
        } else if (searchVal == 'state') {
            endingURL = '&state=' + searchParam;
        } else {
            endingURL = '&search=' + searchParam;
        }

        $.ajax({
            url: baseURL + endingURL,
            method: "GET"
        }).then(function (response) {
            //console.log(response);

            function returnResults() {

                var orgArray = [];
                orgArray.push(response);
                console.log(orgArray);
                
                 for (var i = 0; i < 10; i++) {
                    
                    var random = orgArray[0][(Math.floor(Math.random() * orgArray[0].length))];
                    console.log(random);
                    var orgDisplay = $('<p>');
                    orgDisplay.text(random.charityName);
                    orgDisplay.attr("id", "charity-name");
                    orgWebsiteOne = $("<a>");
                    orgWebsiteOne.attr("id", "website");
                    orgWebsiteOne.attr("href", random.charityNavigatorURL);
                    orgWebsiteOne.attr("target", "_blank");
                    orgWebsiteOne.text(random.charityName);
                    orgWebsiteOne.addClass("link");
                    $('.large').html(orgDisplay);
                    $('#charity-name').append(orgWebsiteOne);
                     }
            }
            returnResults()
        });

        //Build in Javascript for card to display charity information based on API call




        // Build in functionality so that user can click link to go to organization's home page


        //Allow for local storage of previous 5 searches

    };

});