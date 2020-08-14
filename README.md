# newMedicinePlanner

Link: https://dktrcoco.github.io/newMedicinePlanner/

User Story: As a consumer of medication(s) (prescription or OTC), 
I want a mobile UI-compatible website that is capable of tracking the various medications I take, 
provides daily reminders when to take the medications so I can adhere to a schedule,
provides use instructions, warnings, and side effects for each drug, 
and keeps track of when I’m due for a refill of a particular medication.

GIVEN an app that tracks medication use
WHEN I add a medication
THEN the medication in a list (with a pill count), the usage, the warnings, and the side effects are all displayed on the page
WHEN I add an additional medication
THEN the medication list is appended with the new medication
WHEN I click on one of the medications on the populated list
THEN all the information for said medication is displayed 
WHEN I (the user) have taken my medication for the day (ask the user if they took the medicine)
THEN the tracker will update that it has been taken and updates the amount of pills remaining
WHEN a user first enters the app
THEN a disclaimer displays indicating the use of this app should be used as a tracker only, not as specific medical advice, please consult your physician for best practice medication

V2.0:
WHEN a medication is close to being empty
THEN an alert will pop up indicating a refill will be necessary soon
WHEN a medication is added
THEN the chemical structure of the active ingredient is displayed with the information (Chris having to nerd out)
WHEN (IF) there are adverse interactions with already added medication(s)
THEN an alert will pop up as a warning about taking both medications at once
WHEN I add a medication
THEN a calendar populates the days for how many pills I have
WHEN I add a second medication
THEN the med display on the calender will be color coded to each medicine added
