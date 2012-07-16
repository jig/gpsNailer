gpsNailer
=========

Javascript Client Side Code to narrow GPS positioning throught time integration

Description
-----------

Load the page (you can test it at astrosurf.com/jig/gps) and start geting samples. 
It averages them and show on the browser the current average and the number of samples used.

Note
----

It sets enableHighAccuracy to true, so GPS must be used: But sometimes it is not. 
Alternative methods return an altitude of 0 m above the sea level, so this indicates that data is not worth averaging.
Currently the code does not automatically warns of this fact.