jQuery(init);

// Same as: jQuery( document ).ready( init );

// Our Application logic goes here:
function init($) {

    let options = {
        url: "../data.json",
        success: jsonHandler
    }

    function createOptions(listOfCities) {

        let datalist = document.querySelector("#cities-list");
        // console.log(datalist);

        listOfCities.map(addOption);
        function addOption(city) {

            datalist.innerHTML += `<option value="${city}"></option>`

        }

    }
    function jsonHandler(data) {

        let entries = data[1].entries;
        let cities = entries.map(getCity); // Array[ { HOTEL } x 4 ]
        let uniqueCities = removeDups(cities);
        uniqueCities.sort();
        createOptions(uniqueCities);

        function getCity(hotel) { // 4 times: 1 { ... }, 2 { ... }, 3 { ... }, 4 { ... }
            return hotel.city;
        }


        function removeDups(names) {
            let unique = {
                Paris: true,
                Marseille: true,
                Toulouse: true,
            };
            names.forEach(function (i) {
                if (!unique[i]) { unique[i] = true; }
            });
            return Object.keys(unique);
        }
    }

    let citiesInput = document.querySelector("#cities");
    citiesInput.addEventListener("keydown", handleCityInput);

    function handleCityInput(e) {
        if (e.keyCode === 13) {
            console.log("get hotels from city...")
            let selectedCity = this.value;
            console.log("Selected City: ", selectedCity);
        }
    }

    $.ajax(options);

}

// Alternative, no global vars at all:
// jQuery(function init(){ ... });