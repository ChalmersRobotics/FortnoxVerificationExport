const program = require('commander');
const stream = require('stream');
const {promisify} = require('util');
const fs = require('fs');
const got = require('got');

const PDFMerger = require('pdf-merger-js');

const merger = new PDFMerger();


const pipeline = promisify(stream.pipeline);

program
.command('export <serie> <from> <to> <fid>')
.action(async (serie, from, to, fid) => {
  const cookie = "pastecookiestringhere";

  let fromInt = parseInt(from);
  let toInt = parseInt(to);

  for(; fromInt <= toInt; fromInt++) {
    let path = 'exported/' + serie.toUpperCase() + fromInt + ".pdf";
    await pipeline(
        got.stream('https://apps2.fortnox.se/report/report/report.php', {
          searchParams: {
            s: serie.toUpperCase(),
            fid: fid,
            i: fromInt,
            type: "voucher",
            pfu: 1
          },
          headers: {
            'Cookie': cookie,
            'user-agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0",
          }
        }),
        fs.createWriteStream(path)
    );

    merger.add(path);
  }

  await merger.save("exported/" + serie.toUpperCase() + "_merged.pdf");

});


program.parse(process.argv);