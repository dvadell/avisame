# avisame
Remind me, with service workers and react

This is a test, horribly untidy and unprofessional experiment at learning about notifications in serviceWorkers. You can read about it at https://blog.ardor.link/service-workers-and-notifications/, but in summary:

* The user writes the message and pushes the button to send it.
* The <RemindMeForm> component receives it and sends a message to the serviceWorker.
* The serviceWorker loops every 5 seconds and updates the <ShowAlarms> component, which shows the status of the alarms on the screen.
* When the alarm timed out, the serviceWorker shows a notification.

Also, the browser will suspend/kill serviceWorkers to save resources, unless you know what you're doing with promises, and I haven't checked. 
