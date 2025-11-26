const fs = require("fs");

async function main() {

    const data = await fs.promises.readFile("output.txt", "utf8");

    var i = 0;
    for (const line of data.split('\n')) {
        const split = line.split("|");

        var status = split[1];

        if (split[2] == "null" || line == "") {
            console.log(++i + ":\t" + status + "\t\t" + split[0]);
        }

    }

}

main();