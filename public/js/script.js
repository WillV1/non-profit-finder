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
        console.log(searchParamTwo);

    })

    //Callback functions to make two API calls (state or zip) and keyword

    const search = async (searchVal, searchParam, searchParamTwo) => {
        $('.number-one').html(' ');

        const baseURLOne = 'https://api.data.charitynavigator.org/v2/Organizations?app_id=f23e3059&app_key=e0734aa01e43908655ef9c264f6dcf2e&search=' + searchParamTwo;
        let endingURL;

        if (searchVal == 'state') {
            endingURL = '&state=' + searchParam + '&sizeRange=2';
        } else if (searchVal == 'zip') {
            endingURL = '&zip=' + parseInt(searchParam) + '&sizeRange=2';
        } else {
            return
        }

        const responseOne = await $.ajax({
            url: baseURLOne + endingURL,
            method: "GET"
        })

        console.log(responseOne);

        let orgArray = [];
        orgArray.push(responseOne);
        console.log(orgArray);

        for (var i = 0; i < orgArray[0].length; i++) {

            let random = orgArray[0][(Math.floor(Math.random() * orgArray[0].length))];
            console.log(random);
            let orgWebsiteOne = $("<a>");
            orgWebsiteOne.attr("id", "website");
            orgWebsiteOne.attr("href", random.charityNavigatorURL);
            orgWebsiteOne.attr("target", "_blank");
            orgWebsiteOne.text(random.charityName);
            orgWebsiteOne.addClass("link");
            $('.number-one').append(orgWebsiteOne);
            returnResults(random.charityName)
        }

    }

    const returnResults = async (name) => {
        $('.number-two').html(' ');
        console.log("searchTerm");
        console.log(name);
        try {
            const response = await fetch('/search?name=' + name, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    "Content-type": "text/html; charset=UTF-8"
                }
            })
            console.log("response Search");
            console.log(response)
            console.log(await response.json())
        } catch (err) {
            console.log(err)
        }


        //Build in Javascript for card to display charity information based on API calls

        // Code to push news API call results to second card
        function returnNewsResults(data) {

        

            let newsArray = [];
            newsArray.push(response);
            console.log(newsArray.length);

            for (var i = 0; i < newsArray.length; i++) {

                let orgWebsiteTwo = $("<a>");
                orgWebsiteTwo.attr("id", "news-website");
                orgWebsiteTwo.attr("href", data.value[0].url);
                orgWebsiteTwo.attr("target", "_blank");
                orgWebsiteTwo.text(data.value[0].title);
                orgWebsiteTwo.addClass("link");
                console.log(orgWebsiteTwo);
                $('.number-two').append(orgWebsiteTwo);
            }
        }
        returnNewsResults()

    
    }


});