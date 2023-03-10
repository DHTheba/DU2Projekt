
// G
// CODE According to specification
function click_filter_element(event) {
  event.target.classList.toggle("selected");
  update_programmes();
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
        Careful with the propagation of the click-event

    NO RETURN VALUE

  */

}


// G
// CODE according to specification


/*
  ARGUMENTS
    data: object that contains the following keys:
      class (string): a class-name given to the created element
      textContent (string): the text that the element contains
      parent (reference to HTML-element): the HTML-element that is the parent of the created element

    No control of arguments.

  SIDE-EFFECTS
    Creates a new dom-element with the tag "li".
    Gives the new dom-element the class contained in data.class
    Appends the new dom-element to the element referenced in data.parent
    Sets the text content of the new dom-element to data.textContent
    Sets the function click_filter_element as a listener to "click" for the new dom-element

  RETURN VALUE
    Returns a reference to the new dom-element
*/

function create_filter_element(data) {
  parent = data.parent
  klass = data.class
  textContent = data.textContent

  const dom = document.createElement("li");
  dom.classList.add(klass);
  dom.textContent = textContent;
  dom.addEventListener("click", click_filter_element);
  parent.append(dom);

  return dom;

}


// VG
// CODE according to specification
function add_group_toggling(filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */

}


// VG
// CODE according to specifications
function toggle_cities(event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city

//1. create_countries_cities_filters
/*
  ARGUMENTS
    This function does not take any arguments 

  SIDE EFFECTS
    Creates filter for all countries and which cities belong to which country.

  NO RETURN VALUE
*/

//2. create_country
/*
  ARGUMENTS
    country: an object from the array: COUNTRIES, that contain the following keys:
      id: (a number value) the country??s id.
      name: (string) The country??s name.
    No control of arguments

  SIDE EFFECTS
    Creates a new dom_element for a country. Appends it accordingly and gives it text-content and a class for the CSS.
    Then the function filters every city that has a "country" ID that matches with the country.
    Then it calls on the function create_city for each object in the array where the cities have been filtered.

    NO RETURN VALUE
*/

//3. create_cities
/*
  ARGUMENTS
    city: an object from the array CITIES that contain the following keys:
      id: (a number value) the city??s id.
      name: (string) the city??s name.
      countryID: (a number value) the id of the country where the city is located. 
    No control of arguments

  SIDE EFFECTS
    Creates a new dom_element for a city. Appends it inside the newly created country dom_element and gives it a class so
    it will be selected by default.
    Also gives text-content and stores the city ID in the attribute dataset belonging to the dom_element.

  NO RETURN VALUE
*/

function create_countries_cities_filters() {
  function create_country(country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
function create_levels_filter() {
  function create_level(level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter() {
  function create_subject(subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter() {
  function create_element(data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}
//Specification for abstracted function
/*
  ARGUMENT
  Recieves two arguments
  An Array which contains the objects of relevant information to the filter type (levels, subjects or languages)
  A Type which is the name of the category which the filter should represent.
  
  SIDE-EFFECTS
  Creates an LI element for each object in the array using the "create_filter_element" function
  inside of the "create" function.
  The LI is then appended to the "type" parent
  The LI textContent is set to the objects name key
  The LI dataset ID is set to the objects ID key
  Uses array_each to filter through Languge, Subjects and Levels depending on what is called in the function call (in index.js)
  
  NO RETURN VALUE
*/
//Abstracted function below
function create_levels_subjects_languages_filters(array, type) {
  function create(object) {
    const dom = create_filter_element({
      parent: document.querySelector(`#${type}_filter > ul`),
      class: "selected",
      textContent: object.name,
    });
    dom.dataset.id = object.id;
  }

  array_each(array, create(type));
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme(programme) {
  const programme_uniID = programme.universityID;
  const programme_cityID = UNIVERSITIES[programme_uniID].cityID;
  const programme_countryID = CITIES[programme_cityID].countryID;
  const programme_levelID = programme.levelID - 1;
  const programme_subjectID = programme.subjectID;
  const programme_languageID = programme.languageID;


  let new_programme_dom = document.createElement("div");
  new_programme_dom.classList.add("programme");
  new_programme_dom.setAttribute("id", `programme${programme.id}`);


  new_programme_dom.innerHTML = `
    <div class ="top">
      <h2>${programme.name}</h2>
      <p>${UNIVERSITIES[programme_uniID].name}</p>
      <p>${CITIES[programme_cityID].name}, ${COUNTRIES[programme_countryID].name}</p> 
      <p>${LEVELS[programme_levelID].name}, ${SUBJECTS[programme_subjectID].name}, ${LANGUAGES[programme_languageID].name}</p>
    </div>`


  const all_city_pictures = CITIES[programme_cityID].imagesNormal.length;
  const city_name = CITIES[programme_cityID].name.toLocaleLowerCase();
  const random = get_random_number(all_city_pictures, 1);
  const normal_jpg = `_normal_${random}.jpg`;


  new_programme_dom.style.backgroundImage = `url(./media/geo_images/${city_name}${normal_jpg})`;

  document.querySelector("#programmes >ul").append(new_programme_dom);

  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */

}
// array_each(PROGRAMMES, create_programme);

// G
// CODE according to the specification
function update_programmes() {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */
  const programmes_container = document.querySelector("#programmes > ul");
  const programmes_para = document.querySelector("p");
  programmes_container.innerHTML = "";

  const correct_programmes = read_filters();
  array_each(correct_programmes, create_programme);
  if (correct_programmes.length > 0) {
    programmes_para.textContent = ""
  } else if (correct_programmes.length === 0) {
    programmes_para.textContent = "Inga program uppfyller nuvarande filter."
  }
}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it

//FUNCTION SPECIFICATION for read_filters
/*
ARGUMENTS
  This function doesn't take any arguments.

SIDE-EFFECTS
  Function checks which filter_elements are selected.
  It then filters it in order of cities, which universities are in the selected cities,
  then the programmes available in selected universities, and last what level, language and subjects the programmes have.

  The function then checks if the search string is NOT empty
    If the search field is NOT empty then the programmes are filtered and all programmes with matching words in their name are shown.
    However if the search field IS empty then nothing happens and this part of the function is ignored.  

RETURN
  Returns an array of all programmes which matched the selected filters.
*/
function read_filters() {

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
