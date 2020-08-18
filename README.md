# Med-Tracker

Description:

This app is designed to keep track of the medications you're taking, both prescription and over-the-counter. Add the name of your medications one at a time on the left and click submit or hit Enter. This will allow the app to keep track of them for you. It will also provide you with the use instructions for the medication and offer the FDA warnings and possible side effects. You will able to toggle through this information for all of your medications by clicking on the button with the name of the medication. You can remove any medication you want at any time by clicking the delete button.

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

Fig. 1: Landing Page

![Landing Page](Screenshots/Landing%20Page.PNG)

Fig. 2: After Agreeing with Disclaimer

![](Screenshots/After%20Agreeing%20With%20Disclaimer.PNG)

Fig. 3: First Input

![](Screenshots/First%20Input.PNG)

Fig. 4: Collapsible Info

![](Screenshots/First%20Input%20uncollapse%20Info.PNG)

Fig. 5: Second Input

![](Screenshots/Second%20Input.PNG)


Fig. 6: Pill Count Example

![](Screenshots/Pill%20Count%20Difference.PNG)


V2.0 (Future Concepts):

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

Authors: This project was developed as a group by Chris Kabana, Matt Dudzik, Maria Cruz, and Christian Vadevoulis. We all aquired help from our individual tutors, as well as the TA's in instructor for the bootcamp course. The style for the Submit button was originally designed by Mathias Adam and found on dribbble.com.
