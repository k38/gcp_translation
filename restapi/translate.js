function translate(projectid, apikey) {
    const http = require('https');
    const text = `Multiregion serverless distributed training with AWS Batch and Amazon SageMaker`;
    // const postData = {
    //     source_language_code: 'en',
    //     target_language_code: 'ja',
    //     contents: [text],
    // };
    const postData = {
        source: 'en',
        target: 'ja',
        format: 'text',
        q: text,
    };
    const postDataStr = JSON.stringify(postData);
    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postDataStr)
    };
    const options = {
        method: "POST",
        headers: headers
    };
    // const url = `https://translation.googleapis.com/v3beta1/projects/${projectid}/locations/global:translateText?key=${apikey}`;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apikey}`;
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
translate(secret.projectid, secret.key);
