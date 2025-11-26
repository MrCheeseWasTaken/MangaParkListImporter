# MangaListImporter

This is used to import lists from other websites such as MAL or comick into MangaPark

### Table of Contents
- [Requirements](#requirements)
- [Usage](#usage)
- [FAQ](#faq)

# Requirements

- [Node.js](https://nodejs.org/)
- MAL/Comick manga list as xml file ([My list is not xml file](#faq_notXml))
- MangaPark session key (needed to set follow on MangaPark)

# Usage

## Prerequisites

- download this repo as a whole. The repo folder will from now on be referred to as *the folder*
- drag your xml list file into *the folder* and rename it to list.xml
- open command line in the folder
- (optional) type ```node - v``` into cmd to check node.js is installed

## Getting MangaPark session key

1) open the MangaPark website and login.
2) open the developer tools (right-click and click inspect)
3) open application, then open cookies and copy the "skey" value
4) keep hold of it, you'll need it for the next steps

## Step 1

1) open the [GetId.js](GetId.js) file
2) at the top of the file, replace the text ```PUT_YOUR_SESSION_KEY_HERE``` with your MangaPark session, ensure it remains in quotation marks
3) in command line, type node.GetId.js, this will slowly try to find the MangaPark equivilent of the manga by searching the title
4) This should output a ```output.txt``` file

more:

- [Some of my output says ```null```]()
- It's so slow; you can go to the top of the file and change the ```timeBtwnRqst``` value to be less, though I don't recommend as the website may think you are trying to dos them and block you, use at own risk.

# FAQ

## My list is not xml file or not MAL type of xml <h2 id="faq_notXml"></h2>

I can't really help with that, you just gonna have to go into the [GetId.js](GetId.js) file and edit the GetList function to read your list and return an array of dictionaries, the form which is:
```js
{
    title: // title of the manga
    status: // "Reading","Completed","Plan to Read","On-Hold" "Dropped"
}
```

## My output.txt has null values

Then some of the manga did not have an equivilent on MangaPark or perhaps the title of the manga was not found, you will have to manually add those.

you can type ```node ListNotFound.js``` to display all not found mangas
