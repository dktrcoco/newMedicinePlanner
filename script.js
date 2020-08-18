//tying in id for input field
var medInputEl = document.getElementById("medInput");

//uses moment.js to display the current date
$("#currentDay").text(moment().format("dddd MMMM Do"));

//line that pulls the meds from local storage
var meds = JSON.parse(localStorage.getItem("meds")) || [];
var medInput = $("#medInput").val(); //defines the input text as medInput value

//script to allow enter key also function as clicking submit button
medInputEl.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submitMeds").click();
  }
});

//event listener that will activate when page loads
window.addEventListener("load", function () {
  disclaimer();

  //event listener that waits for checkbox to be clicked
  agreeWithDisclaimer.addEventListener(
    "click",
    function () {
      //if checkbox is checked, change visibility of submit button to visible
      if (agreeWithDisclaimer.checked) {
        submitMeds.style.visibility = "visible";
        medInputEl.style.visibility = "visible";

        //disables the checkbox so user cannot accidentally uncheck after checking
        document.getElementById("agreeWithDisclaimer").disabled = true;
      }

      //otherwise, visibility remains hidden
      else {
        submitMeds.style.visibility = "hidden";
        medInputEl.style.visibility = "hidden";
      }
    },
    false
  );
});

//confirm for user to see displayed disclaimer
function disclaimer() {
  confirm(
    "Do not rely on this application to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products."
  );
}

renderButtons();

function saveMeds() {
  var medInput = $("#medInput").val(); //defines the input text as var value
  var medObj = {
    name: medInput,
    count: 30,
  };
  if (meds.indexOf(medInput) === -1) {
    var found = meds.findIndex((el) => {
      return el.name.toLowerCase() === medInput.toLowerCase();
    });
    console.log(meds);
    console.log(found);
    if (found < 0) {
      console.log("not found");
      meds.push(medObj);
      localStorage.setItem("meds", JSON.stringify(meds));
    }
  }

  renderButtons();
}

function renderButtons() {
  //creates an unordered list with no bullets
  const buttonWrapper = $("<ul style='list-style: none;'/>");

  const medLists = meds.map((x) => {
    return (
      //dynamically creates a list
      //each line of list contains a div that contains a button that will display med info
      "<li><div class='divDelete'><button class='getMedicine' id='" +
      x.name +
      "'>" +
      x.name +
      //button in each line in list that deletes the med from the list
      "</button><button class='delete' >" +
      "X" +
      "</button>" +
      //counter in list that displays number of pills remaining
      " Count: " +
      x.count +
      "</div></li>"
    );
  });
  buttonWrapper.append(medLists);
  $("#medDisplay").html(buttonWrapper);
}

//creates the delete button next to the medication
function getDeleteClick(event) {
  if (!event) {
    return;
  }
  const button = event.target;
  console.log($(button));
  var divDelete = $(button).parent().parent();
  console.log(divDelete);
  // deletes medication full div
  var medID = divDelete.find(".getMedicine").attr("id");
  divDelete.remove();
  var currentMeds = JSON.parse(localStorage.getItem("meds"));
  console.log(currentMeds);
  //deletes from local storage
  const index = currentMeds.findIndex((el) => el.name === medID);
  if (index > -1) {
    currentMeds.splice(index, 1);
  }
  console.log(currentMeds);
  localStorage.setItem("meds", JSON.stringify(currentMeds));
}

//grabs input when submit button is clicked
function getMedicineClick(event) {
  if (!event) {
    return;
  }
  const button = event.target;
  const medicineName = $(button).attr("id");
  $("#medInput").val(medicineName);
  $("#submitMeds").trigger("click");
}

//trying to make a decrement of one per day for a var
//have to dynamically create a var for each med input
var counter;

//function that sets the interval of decrementing pill count to 24 hours
function pillCounter() {
  var dailyDose = setInterval(function () {
    meds.forEach((el) => {
      el.count -= 1;
    });
    localStorage.setItem("meds", JSON.stringify(meds));
  }, 24 * 60 * 60 * 1000);
}

//function that allows differnet fields to collapse upon clicking their buttons
function createCollapse(title, content) {
  var id = title.split(" ").join("-");
  //Syntax which allows the function to run
  return `
  <p>
  <a class="btn btn-primary" data-toggle="collapse" href="#${id}" role="button" aria-expanded="false" aria-controls="collapseExample">
    ${title}
  </a>
  </p>
  <div class="collapse" id="${id}">
  <div class="card card-body content">
    ${content}
  </div>
  </div>
  `;
}

function renderData() {
  var drug = $("#medInput").val();

  //If nothing is in input field, return
  if (!drug) {
    return;
  }

  //calls function to save med input to localStorage
  saveMeds();

  //calls function to set pill counter for each med submitted and set decrement interval to 24 hours
  pillCounter();

  //API key for openFDA
  var APIKey = "9T91KX0fND6FQdNSBejeTZYWGSOMmilhOIt9NBfz";

  //NOTE: This API is from the US FDA. This is from the same source as the second API used below.
  //This API contains distinctly different and unique data than the below API.
  //This API houses the use directions and warnings of the drug in question.
  //in 2018 the FDA cataloged over 1.8 million research studies to accumulate this data.
  var labelQueryURL =
    "https://api.fda.gov/drug/label.json?api_key=" + APIKey + "&search=" + drug;

  //AJAX call for the label API that contains usage and warning info
  $.ajax({
    url: labelQueryURL,
    method: "GET",
  }).then(function (response) {
    $(".med-display").show();

    //sets const warnings to content of .warnings
    const warnings =
      response.results[0].warnings && response.results[0].warnings[0];

    //sets const warnings2 to content of .warnings_and_cautions
    const warnings2 =
      response.results[0].warnings_and_cautions &&
      response.results[0].warnings_and_cautions[0];

    //combines the two above consts
    const visibleWarnings = warnings || warnings2;

    //pulls the warning of the drug in question and populates the html
    var warningsCollapse = createCollapse(
      "Warning",
      "Warning: " + visibleWarnings
    );
    //allows the element to toggle open and closed
    $(".warning").html(warningsCollapse);

    //pulls the usage of the drug in question and populates the html
    var usageCollapse = createCollapse(
      "Usage",
      "Usage: " + response.results[0].indications_and_usage[0]
    );
    $(".usage").html(usageCollapse);
    //^^line above has to be underneath console.log section to run optimally.
  });

  //NOTE: This second API is from the same source as the first, the US FDA.
  //This API contains distinctly different and unique data than the above API.
  //This API houses the side effects reported on the use of the drug in question.
  //In 2018 the FDA cataloged over 1.8 million research studies to accumulate this data.
  var eventQueryURL =
    "https://api.fda.gov/drug/event.json?api_key=" + APIKey + "&search=" + drug;

  //AJAX call for the event API that contains side effect info
  $.ajax({
    url: eventQueryURL,
    method: "GET",
  }).then(function (secondResponse) {
    //dynamically creates an unordered list
    var reactionsList = $("<ul>");

    //loop that iterates over list of side effects from the API
    for (
      var i = 0;
      i < secondResponse.results[0].patient.reaction.length;
      i++
    ) {
      //appends the unordered list created above with next side effect
      $(reactionsList).append(
        $("<li>").text(
          secondResponse.results[0].patient.reaction[i].reactionmeddrapt
        )
      );
    }

    //pulls the side effects reported on use of the drug in question
    console.log(reactionsList.prop("outerHTML"));
    var reactionsCollapse = createCollapse(
      "Side Effects",
      "When using this medication, some patients have experienced the following side effects: " +
        reactionsList.prop("outerHTML")
    );

    //displays the list of side effects in element with class="reactions"
    $(".reactions").html(reactionsCollapse);
  });
}

//array to be populated with the side effects pulled from the api
// var sideEffects = [];

$(document).ready(function () {
  //Event Listener that calls renderData when Submit button is clicked
  $(document).on("click", "#submitMeds", () => renderData());

  //Event Listener that calls getMedicineClick when a Med button is clicked
  $(document).on("click", ".getMedicine", (e) => getMedicineClick(e));

  //Event Listener that calls getDeleteClick when a Delete button is clicked
  $(document).on("click", ".delete", (e) => getDeleteClick(e));
});
