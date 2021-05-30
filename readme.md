Fortnox did not have an easy way to print all of the verifications separately without having to open
each one one-by-one, so I made this script to export an entire series and merge to a single pdf

Usage:

`node fortnoxexport.js export <series> <from> <to> <fid>`

You can find the fid in the URL when printing a verification from the fortnox ui.

You have to copy the cookie-string and paste it in the cookie variable in the script to be able to
download the pdfs. You can find this string by opening browser dev tool, go to network, press reload
and check the Cookie request header.