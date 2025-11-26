const timeBtwnRqst = 500 // in miliseconds
const key = "PUT_YOUR_SESSION_KEY_HERE";

const fs = require("fs");
const { type } = require("os");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const STATUS_CONVERT = {
    "Reading": "doing",
    "Completed": "completed",
    "Plan to Read": "wish",
    "On-Hold": "on_hold",
    "Dropped": "dropped"
}

async function SetStatus(id, status) {

    const payload = {
        comicId: id,
        status: status
    };

    const url = "https://mangapark.io/aok/marking-comic-status";

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

}

async function main() {

    const data = await fs.promises.readFile("output.txt", "utf8");

    var i = 0;
    const dataSize = data.split("\n").length;
    for (const line of data.split('\n')) {
        i++;

        const split = line.split("|");

        var status = STATUS_CONVERT[split[1]];
        if (status == null) {
            status = STATUS_CONVERT["Reading"];
        }

        if (split[2] == "null" || line == "") {
            console.log(i + "/" + dataSize + ":\t" + "skipped" + "\t" + split[1] + "\t" + split[0]);
        } else {
            console.log(i + "/" + dataSize + ":\t" + split[2] + "\t" + split[1] + "\t" + split[0]);
            await SetStatus(split[2], status)
        }

        await sleep(timeBtwnRqst + Math.random()  * (200 - 50) + 50);

    }

}

main();