var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");
var mailer = require('express-mailer')
var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: '',
    pass: ''
  }
});

app.use(express.static(__dirname + '/views'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function(req, res){
  res.render('index.html')
})

app.post('/api_call', function(req, res){
  console.log(req.body.name)

  var options = { method: 'GET',
    url: req.body.name,
    headers:
     { 'postman-token': '50db57eb-bbd6-1ec4-f07d-92fd28fd178f',
       'cache-control': 'no-cache',
       authorization: 'Basic ci5sZXZ5dHNAZ21haWwuY29tOkRDMTk2NDg3',
       'content-type': 'application/json' }
     };

   request(options, function (error, response, body) {
     if (error) throw new Error(error);

     let keyWords = ['cancer', 'ras', 'liver', 'enzyme', 'stuff', 'drugs']
     let includedWords = keyWords.filter( word => body.includes(word))

     res.json({words: includedWords})
   });

})

app.post('/send_email', function(req,res){
  console.log('Send mail post worked')
  app.mailer.send('email.html', {
    to: 'rcw278@nyu.edu', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Test Email', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function(err){
    console.log(err)
  })

  res.send('Email sent!')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
