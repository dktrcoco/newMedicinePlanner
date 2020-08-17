# newMedicinePlanner

Link: https://dktrcoco.github.io/newMedicinePlanner/

User Story: As a consumer of medication(s) (prescription or OTC),
 
I want a mobile UI-compatible website that is capable of tracking the various medications I take, 

provides use instructions, warnings, and side effects for each drug, 

and keeps track of how many pills are remaining.

GIVEN an app that tracks medication use

WHEN the user a medication

THEN the medication in a list, the usage, the warnings, the side effects, and pill count are all displayed on the page

WHEN a day (24h) passes

THEN the pill counter decreases by 1, signifying the user took one pill that day

WHEN the user adds an additional medication

THEN the medication list is appended with the new medication

WHEN the user clicks on one of the medications on the populated list

THEN all the information for said medication is displayed 

WHEN a user first enters the app

THEN a disclaimer displays indicating the use of this app should be used as a tracker only, not as specific medical advice, please consult your physician for best practice medication

V2.0:

WHEN the user has taken my medication for the day (ask the user if they took the medicine)

THEN the tracker will update that it has been taken and updates the amount of pills remaining

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
