//DOM elements

//tying in id for input field
var medInputEl = document.getElementById("medInput");

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
  agreeWithDisclaimer.addEventListener("click", function () {

    //if checkbox is checked, change visibility of submit button to visible
    if (agreeWithDisclaimer.checked) {
      submitMeds.style.visibility = "visible";
      medInputEl.style.visibility = "visible";
    }

    //otherwise, visibility remains hidden
    else {
      submitMeds.style.visibility = "hidden";
      medInputEl.style.visibility = "hidden";
    }
  }, false)
})

//confirm for user to see displayed disclaimer
function disclaimer() {
  confirm("Do not rely on this application to make decisions regarding medical care. Always speak to your health provider about the risks and benefits of FDA-regulated products.")
}

// document.getElementById("medDisplay").innterHTML = localStorage.getItem("meds");

function saveMeds() {
  var medInput = $("#medInput").val(); //defines the input text as var value
  // var key = $("#medInput").attr("id"); //defines the id as var key
  if (meds.indexOf(medInput) === -1) {
    meds.push(medInput);
    localStorage.setItem("meds", JSON.stringify(meds));
    
  }
  // renderButtons(meds);
}

//month count down
var a = moment().endOf("month");
var b = moment();
console.log(a.diff(b, "days"));

//medication button
function renderData() {
  saveMeds();
  var drug = $("#medInput").val();
  if (!drug) {
    return;
  }
  
  // This is our API key for openFDA
  var APIKey = "9T91KX0fND6FQdNSBejeTZYWGSOMmilhOIt9NBfz";

  //NOTE: This API is from the US FDA. This is from the same source as the second API used below.
  //This API contains distinctly different and unique data than the below API.
  //This API houses the use directions and warnings of the drug in question.
  //in 2018 the FDA cataloged over 1.8 million research studies to accumulate this data.
  var labelQueryURL =
    "https://api.fda.gov/drug/label.json?api_key=" + APIKey + "&search=" + drug;

  // We then created an AJAX call
  $.ajax({
    url: labelQueryURL,
    method: "GET",
  }).then(function (response) {
    //pulls the warning of the drug in question and populates the html
    $(".warning").text("Warning: " + response.results[0].warnings[0]);

    //pulls the usage of the drug in question and populates the html
    $(".usage").text("Usage: " + response.results[0].indications_and_usage[0]);

    $(".med-display").show()
    //^^line above has to be underneath console.log section to run optimally.
    //maybe i can correlate the label to the adverse events api
    //by using the ndc number
  });

  //NOTE: This second API is from the same source as the first, the US FDA.
  //This API contains distinctly different and unique data than the above API.
  //This API houses the side effects reported on the use of the drug in question.
  //In 2018 the FDA cataloged over 1.8 million research studies to accumulate this data.
  var eventQueryURL =
    "https://api.fda.gov/drug/event.json?api_key=" + APIKey + "&search=" + drug;

  $.ajax({
    url: eventQueryURL,
    method: "GET",
  }).then(function (secondResponse) {
    //pulls the side effects reported on use of the drug in question
    $(".reactions").text(
      "When using this medication, some patients have experienced the following side effects: " +
      secondResponse.results[0].patient.reaction[0].reactionmeddrapt
    );
    var reactionsList = $("<ul>")

    //attempt at loop to pull and display more than one side effect of the drug in question
    for (
      var i = 0;
      i < secondResponse.results[0].patient.reaction.length;
      i++
    ) {
      $(reactionsList).append(

        $("<li>").text(
          secondResponse.results[0].patient.reaction[i].reactionmeddrapt
        )
      );
    }

    $(".reactions").append(reactionsList);
    //maybe i can correlate the label to the adverse events api
    //by using the ndc number
  });
}

//array to be populated with the side effects pulled from the api
var sideEffects = [];

$("#submitMeds").on("click", renderData);
