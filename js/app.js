jQuery(init);

// Same as: jQuery( document ).ready( init );

// Our Application logic goes here:
function init($) {

    let options = {  url: "../data.json",success: jsonHandler}
    let entries;

    
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

    function createOptions(listOfCities) {

        let datalist = document.querySelector("#cities-list");
        // console.log(datalist);

        listOfCities.map(addOption);
        function addOption(city) {

            datalist.innerHTML += `<option value="${city}"></option>`

        }

    }
    function jsonHandler(data) {

        entries = data[1].entries;
        let cities = entries.map(getCity); // Array[ { HOTEL } x 4 ]
        let uniqueCities = removeDups(cities);
        uniqueCities.sort();
        createOptions(uniqueCities);

        function getCity(hotel) { // 4 times: 1 { ... }, 2 { ... }, 3 { ... }, 4 { ... }
            return hotel.city;
        }


    }



    //filtering users input and getting the right output...
    function getHotelsFromSelected( selectedCity ){
        function filterHotels( hotel ) {
            return hotel.city.toLowerCase() === selectedCity.toLowerCase().trim();
        }
        let availableHotels = entries.filter( filterHotels );
        return availableHotels;
      
        
    }
//Handle City Input
    let citiesInput = document.querySelector("#cities");
    citiesInput.addEventListener("keydown", handleCityInput);


//setting the function to react on enter key...
    function handleCityInput(e) {
        if (e.keyCode === 13) {
            let selectedCity = this.value;
           let foundHotels = getHotelsFromSelected( selectedCity );
           displaySelectedHotels( foundHotels );
        }
    }

    function displaySelectedHotels( foundHotels ) {

        let hotelsSection = document.querySelector( ".hotels" )
        hotelsSection.innerHTML = ""
        
        //1) Loop over found hotels' list
        //1.2) For every HOTEL object -> get Template -> clone -> update content -> append to .hotels
        foundHotels.map( displayHotel );
      

        function displayHotel( hotel ) {
           
         let template = document.querySelector( "#template" );
         let clone = template.cloneNode( true );
         let img = clone.querySelector( ".hotel-photo" );
         img.setAttribute( "src", hotel.thumbnail );
            
       
         clone.classList.remove( "hidden" );
         hotelsSection.appendChild( clone );
        
        }
    }

    $.ajax(options);

}

// Alternative, no global vars at all:
// jQuery(function init(){ ... });