function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

function displayReminders() {

    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function init() {
    var storeDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storeDay;
    }

    saveReminders();
    displayReminders();
}

getHeaderDate();

myDay.forEach(function(_thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
});

$("container").append(hourRow);

var hourField = $("<div>")
.text(`${thisHour.hour}${thisHour.meridiem}`)
.attr({
    "class": "col-md-2 hour"
});

var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
   
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);


init();

$("saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings("description").children("future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings("description").children("future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})

