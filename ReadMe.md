# MangaParkListImporter

This is used to import lists from other websites such as MAL or comick into MangaPark

### Table of Contents
- [Requirements](#requirements)
- [Usage](#usage)
- [FAQ](#faq)

# Requirements

- [Node.js](https://nodejs.org/)
- MAL/Comick manga list as xml file ([My list is not xml file](#faq_notXml))
- OR Comick CSV file
- MangaPark session key (needed to set follow on MangaPark)

# Usage

## Prerequisites

- download this repo as a whole. The repo folder will from now on be referred to as *the folder*
- drag your xml/csv list file into *the folder* and rename it to list.xml/list.csv
- open command line in the folder
- (optional) type ```node -v``` into cmd to check node.js is installed

## Getting MangaPark session key

1) open the MangaPark website and login.
2) open the developer tools (right-click and click inspect)
3) open application, then open cookies and copy the "skey" value
4) keep hold of it, you'll need it for the next steps

## Step 1

If you are using CSV list file, do the same but use the [GetIdCSV.js](GetIdCSV.js) instead of [GetId.js](GetId.js)

1) open the [GetId.js](GetId.js) file
2) at the top of the file, replace the text ```PUT_YOUR_SESSION_KEY_HERE``` with your MangaPark session, ensure it remains in quotation marks
3) in command line, type ```node GetId.js```, this will slowly try to find the MangaPark equivilent of the manga by searching the title
4) This should output a ```output.txt``` file

more:

- [Some of my output says ```null```](#faq_notFound)
- It's so slow; you can go to the top of the file and change the ```timeBtwnRqst``` value to be less, though I don't recommend as the website may think you are trying to DOS them and block you, use at own risk.

## Step 2

1) open the [SetStatus.js](SetStatus.js) file
2) at the top of the file, replace the text ```PUT_YOUR_SESSION_KEY_HERE``` with your MangaPark session, ensure it remains in quotation marks
3) in command line, type ```node GetId.js```, this will slowly set the statuses of the mangas of MangaPark
4) You're done, go to MangaPark and check in your library on the status tab, your mangas should have been transferred

more:

- [Some of my mangas are skipped](#faq_notFound2)
- It's so slow; you can go to the top of the file and change the ```timeBtwnRqst``` value to be less, though I don't recommend as the website may think you are trying to DOS them and block you, use at own risk.

# FAQ

## <h2 id="faq_notXml">My list is not xml file or not MAL type of xml</h2>

I can't really help with that, you just gonna have to go into the [GetId.js](GetId.js) file and edit the GetList function to read your list and return an array of dictionaries, the form which is:
```js
{
    title: // title of the manga
    status: // "Reading","Completed","Plan to Read","On-Hold" "Dropped"
}
```

## <h2 id="faq_notFound">My output.txt has null values</h2>

Then some of the manga did not have an equivilent on MangaPark or perhaps the title of the manga was not found, you will have to manually add those.

you can type ```node ListNotFound.js``` to display all not found mangas

## <h2 id="faq_notFound2">Some of the mangas get skipped</h2>

Then some of the manga did not have an equivilent on MangaPark or perhaps the title of the manga was not found, you will have to manually add those.

you can type ```node ListNotFound.js``` to display all not found mangas

## Some of the mangas are incorrect / not in my list

Then probably the search didn't work well on the manga title and added the wrong manga, can't help much with that. You'll have to fix those manually.
