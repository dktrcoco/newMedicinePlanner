$("#currentDay").text(moment().format("dddd MMMM Do"));

var meds = JSON.parse(localStorage.getItem("meds")) || [];
var medInput = $("#medInput").val(); //defines the input text as medInput value

function saveMeds() {
  var medInput = $("#medInput").val(); //defines the input text as var value
  var key = $("#medInput").attr("id"); //defines the id as var key
  if (meds.indexOf(value) === -1) {
    meds.push(value);
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
  var drug = $("#medInput").val();
  if (!drug) {
    return;
  }
  // This is our API key
  var APIKey = "9T91KX0fND6FQdNSBejeTZYWGSOMmilhOIt9NBfz";

  //hard code a drug for proof of concept
  //var drug = "Nicotine"; //Vicodin, Nicotine, Viagra, Xanax,

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

    console.log(response.results[0].warnings[0]);
    console.log(response.results[0].indications_and_usage[0]);
    console.log(response.results[0]);
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

    //attempt at loop to pull and display more than one side effect of the drug in question
    for (
      var i = 0;
      i < secondResponse.results[0].patient.reaction.length;
      i++
    ) {
      $(reactionsList).append(
        // "When using this medication, some patients have experienced the following side effects: " +
        $("<li>").text(
          secondResponse.results[0].patient.reaction[i].reactionmeddrapt
        )
      );
    }

    console.log(secondResponse.results[0].patient.reaction[0].reactionmeddrapt);

    $(".reactions").append(reactionsList);
    //maybe i can correlate the label to the adverse events api
    //by using the ndc number
  });
}

//array to be populated with the side effects pulled from the api
var sideEffects = [];

// function renderSideEffects() {

//   //trying to create a loop to display all of the listed side effects in the objects
//   //the way I have it above populates it with the first, then overwrites that one with the proceeding side effect
//   var effects = sideEffects[i];

//   var li = document.createElement("li");
//   li.textContent =

// }
$("#submitMeds").on("click", renderData);
