const timeBtwnRqst = 500 // in mili-seconds
const listFile = "list.csv"
const key = "PUT_YOUR_SESSION_KEY_HERE"

const fs = require("fs");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function GetList() {

    var output = []

    try {

        const csvData = await fs.promises.readFile(listFile, "utf8");

        var i = -1;
        for (const line of csvData.split('\n')) {
            i++;
            if (i == 0) {
                continue;
            }
            const split = line.split(",");

            const mtitle = split[1];
            var mstatus = split[2];

            output.push({ title: mtitle, status: mstatus });

        }

    } catch (err) {
        console.error("Error:", err);
    }

    return output;

}

async function GetId(name) {

    const payload = {
        query: 'query get_searchComic($select: SearchComic_Select) {\n  get_searchComic(select: $select) {\n    reqPage reqSize reqSort reqWord\n    newPage\n    paging {\n      total pages page init size skip limit prev next\n    }\n    items {\n      id\n      data {\n        id name urlPath\n      }\n    }\n  }\n}',
        variables: {
            select: {
                word: name,
                size: 10,
                page: 1,
                sortby: "field_score"
            }
        }
    };

    const url = "https://mangapark.io/apo/";

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': 'skey=' + key + '; nsfw=2'
        },
        body: JSON.stringify(payload)
    });

    if (!resp.ok) {
        throw new Error(`Response status: ${resp.status}`);
        return null;
    }

    const result = await resp.json();

    // console.log(result)

    const items = result.data.get_searchComic.items;

    if (items.length > 0) {
        // var out = {
        //     id: items[0].id,
        //     name: items[0].name
        // }
        // console.log(items[0])
        return { id: items[0].id, title: items[0].data.name };
    }

    return null;

}

async function main() {

    output = ""

    const list = await GetList();

    var i = 0;
    for (const manga of list) {
        i++;

        // console.log(manga);

        const info = await GetId(manga.title);

        var consoleOut = i + "/" + list.length + ":\t" + manga.title + "\t" + manga.status + "\t";
        if (info != null) {
            console.log(consoleOut + info.id + "\t" + info.title);
            output += manga.title + "|" + manga.status + "|" + info.id + "|" + info.title;
        } else {
            console.log(consoleOut + "null");
            output += manga.title + "|" + manga.status + "|" + "null";
        }
        output += "\n";

        await sleep(timeBtwnRqst + Math.random() * (200 - 50) + 50);

    }

    fs.writeFile("output.txt", output, err => {
        if (err) throw err;
        console.log("File written.");
    });

}

main();