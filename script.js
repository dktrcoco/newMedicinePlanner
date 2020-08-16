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
      //if checkbox is checked, change visibility of submit button and input field to visible
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

  //defines the input text as var medInput
  var medInput = $("#medInput").val();

  if (meds.indexOf(medInput) === -1) {
    meds.push(medInput);
    localStorage.setItem("meds", JSON.stringify(meds));
  }
  //$("#medDisplay").html(localStorage.getItem("meds"));

  renderButtons();
}

function renderButtons() {

  //creates an unordered list with no bullets
  const buttonWrapper = $("<ul style='list-style: none;'/>");
  // buttonWrapper.setAttribute("list-style-type", "none");
  const medLists = meds.map((x) => {
    return (
      "<li><div class='divDelete'><button class='getMedicine' id='" + x + "'>" + x + "</button><button class='delete' >" + "delete" + "</button></div></li>"
    );
  });
  buttonWrapper.append(medLists);
  $("#medDisplay").html(buttonWrapper);
}

function getDeleteClick(event) {
  if (!event) {
    return;
  }
  const button = event.target;
  console.log($(button));
  var divDelete = $(button).parent().parent();
  console.log(divDelete);
  var medID = divDelete.find(".getMedicine").attr("id");
  divDelete.remove();
  var currentMeds = JSON.parse(localStorage.getItem("meds"));
  console.log(currentMeds);
  const index = currentMeds.indexOf(medID);
  if (index > -1) {
    currentMeds.splice(index, 1);
  }
  console.log(currentMeds);
  localStorage.setItem("meds", JSON.stringify(currentMeds));
}

function getMedicineClick(event) {
  if (!event) {
    return;
  }

  const button = event.target;
  const medicineName = $(button).attr("id");
  $("#medInput").val(medicineName);
  $("#submitMeds").trigger("click");
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

  saveMeds();
  //API key for openFDA
  var APIKey = "9T91KX0fND6FQdNSBejeTZYWGSOMmilhOIt9NBfz";

  //NOTE: This API is from the US FDA. This is from the same source as the second API used below.
  //This API contains distinctly different and unique data than the below API.
  //This API houses the use directions and warnings of the drug in question.
  //in 2018 the FDA cataloged over 1.8 million research studies to accumulate this data.
  var labelQueryURL = "https://api.fda.gov/drug/label.json?api_key=" + APIKey + "&search=" + drug;

  $.ajax({
    url: labelQueryURL,
    method: "GET",
  }).then(function (response) {
    $(".med-display").show();
    const warnings =
      response.results[0].warnings && response.results[0].warnings[0];
    const warnings2 =
      response.results[0].warnings_and_cautions &&
      response.results[0].warnings_and_cautions[0];
    const visibleWarnings = warnings || warnings2;

    //pulls the warning of the drug in question and populates the html
    $(".warning").text("Warning: " + visibleWarnings);

    //pulls the usage of the drug in question and populates the html
    $(".usage").text("Usage: " + response.results[0].indications_and_usage[0]);
    //^^line above has to be underneath console.log section to run optimally.
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
    var reactionsList = $("<ul>");

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

    $(".reactions").html(reactionsList);
  });
}

//array to be populated with the side effects pulled from the api
// var sideEffects = [];

//Event Listeners
$(document).ready(function () {
  $(document).on("click", "#submitMeds", () => renderData());
  $(document).on("click", ".getMedicine", (e) => getMedicineClick(e));
  $(document).on("click", ".x", (e) => getDeleteClick(e));
});
