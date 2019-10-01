function translate(projectid, bearer) {
    const http = require('https');
    const text = `Multiregion serverless distributed training with AWS Batch and Amazon SageMaker`;
    const postData = {
        source_language_code: 'en',
        target_language_code: 'ja',
        contents: [text],
    };
    // const postData = {
    //     source: 'en',
    //     target: 'ja',
    //     format: 'text',
    //     q: text,
    // };
    const postDataStr = JSON.stringify(postData);
    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postDataStr),
        'Authorization': `Bearer ${bearer}`
    };
    const options = {
        method: "POST",
        headers: headers
    };
    const url = `https://translation.googleapis.com/v3beta1/projects/${projectid}/locations/global:translateText`;
    // const url = `https://translation.googleapis.com/language/translate/v2?key=${apikey}`;
    const req = http.request(url, options, function(res){
        let output = "";
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            output += chunk;
        });
        res.on('end', function(){ console.log(output) });
    });
    req.on('error', function(e){ console.log(JSON.stringify(e)) });
    req.write(postDataStr);
    req.end();
}

const secret = require('./secret.js');
const exec = require('child_process').exec;
const out = exec("gcloud auth application-default print-access-token", (err, stdout, stderr) => {
    if (err){ console.log(err); }
    // console.log(stdout.trim());
    translate(secret.projectid, stdout.trim());
    // console.log(stdout);
});
