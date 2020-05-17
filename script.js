$(document).ready(function () {

    let searchVal;
    let searchParam;
    let searchParamTwo;
    let searchedList = [];

    // Scripts for Materialize functionality

    M.AutoInit();
    $(document).ready({ passive: true }, function () {
        $('select').formSelect();
    });
    M.textareaAutoResize($('#textarea1'));

    M.textareaAutoResize($('#textarea2'));

    $(document).ready({ passive: true }, function () {
        $('.sidenav').sidenav();
    });

    //Moment.js script for current date

    let date = moment().format('MMMM Do YYYY');

    $('#date').text(date);

    //Build in Javascript that allows dropdown option to determine what text will go into text areas

    const myTextBox = $('#textarea1');
    const myTextBoxTwo = $('#textarea2')
    const myDropDown = $('#organization-search');

    myDropDown.on('change', function () {
        searchVal = ($(this).val());
        console.log($(this).val())
    })



    //Allow for local storage of previous 5 searches

    function storeSearches() {
        $('.recent-searches').empty()
        let recentSearches = JSON.parse(localStorage.getItem('searches')) || []
        // console.log(recentSearches);
        for (var i = 0; i < recentSearches.length; i++) {
            while (recentSearches.length > 5) {
                var lastFive = recentSearches.length - 5;
                var index = 0;
                recentSearches.splice(index, lastFive);
                index++
            }
            let lastItem = $('<li>')
            let breakItem = $('<br>')
            lastItem.addClass("list-group-item");
            lastItem.text(recentSearches)
            $('#recent-searches').append(lastItem);
            lastItem.append(breakItem);


        }
        console.log(recentSearches);
    }
    storeSearches()

    //Build in Javascript for Charity Navigator API calls, based on state or zip and category
    //Build in Javascript for API call to coincide with search parameters

    $('#button').on('click', function (event) {
        event.preventDefault();
        searchParam = myTextBox.val();
        searchParamTwo = myTextBoxTwo.val();


        let lastSearched = $("<li>")
        lastSearched.text(searchParam);
        searchedList.push(lastSearched[0].textContent);
        $("#recent-searches").append(searchedList);
        console.log(searchedList)

        const recentSearches = JSON.parse(localStorage.getItem('searches')) || [];

        // console.log(searchList)

        localStorage.setItem('searches', JSON.stringify(searchedList));
        // //console.log(searchList);
        console.log(searchParam);
        search(searchVal, searchParam, searchParamTwo);

    })

    //Callback functions to make two API calls (state or zip) and keyword

    function search(searchVal, searchParam, searchParamTwo) {
        $('.number-one').html(' ');

        const baseURLOne = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=f23e3059&app_key=e0734aa01e43908655ef9c264f6dcf2e&search' + searchParamTwo;
        let endingURL;

        if (searchVal == 'state') {
            endingURL = '&state=' + searchParam;
        } else if (searchVal == 'zip') {
            endingURL = '&zip=' + parseInt(searchParam);
        } else {
            return
        }

        $.when(
            $.ajax({
                url: baseURLOne + endingURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                //Build in Javascript for card to display charity information based on API calls

                function returnResults() {

                    let orgArray = [];
                    orgArray.push(response);
                    console.log(orgArray);

                    for (var i = 0; i < 10; i++) {

                        let random = orgArray[0][(Math.floor(Math.random() * orgArray[0].length))];
                        console.log(random);
                        let orgWebsiteOne = $("<a>");
                        orgWebsiteOne.attr("id", "website");
                        orgWebsiteOne.attr("href", random.charityNavigatorURL);
                        orgWebsiteOne.attr("target", "_blank");
                        orgWebsiteOne.text(random.charityName);
                        orgWebsiteOne.addClass("link");
                        $('.small').append(orgWebsiteOne);
                    }
                }
                returnResults()

// Second callback to make news API call

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=" + random.charityName + "&safeSearch=true",
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                        "x-rapidapi-key": "d9822625a2msh4f7608dcb4681cbp1d805fjsn2e6e7ce7ee4b"
                    }
                }

                $.ajax(settings).done(function (responseTwo) {
                    console.log(responseTwo);
                })

                    .then(function (responseTwo) {
                        console.log(responseTwo);

                        function returnNewsResults() {

// Code to push news API call results to second card
                $('.number-two').html(' '); 

                            let newsArray = [];
                            newsArray.push(responseTwo);
                            console.log(newsArray);
        
                            // for (var i = 0; i < 10; i++) {
        
                            //     let random = orgArray[0][(Math.floor(Math.random() * orgArray[0].length))];
                            //     console.log(random);
                            //     let orgWebsiteOne = $("<a>");
                            //     orgWebsiteOne.attr("id", "website");
                            //     orgWebsiteOne.attr("href", random.charityNavigatorURL);
                            //     orgWebsiteOne.attr("target", "_blank");
                            //     orgWebsiteOne.text(random.charityName);
                            //     orgWebsiteOne.addClass("link");
                            //     $('.small').append(orgWebsiteOne);
                            // }
                        }
                        returnNewsResults()

                    })


            })

        )






};
search();

});