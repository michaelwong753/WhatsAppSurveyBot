var express = require('express');
var app = express();
const accountSid = 'ACa137d6e3485121c895921bafcbf48e54';
const authToken = 'c8f38ee302f91e4b47734a4491ddd8b9';
const client = require('twilio')(accountSid, authToken);
var bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

var questions;
var boo = 0;
var StringInput;
var userCount =0;
var outputString = ' ';
var UserInput;
var response = new Array(20);
app.use(bodyParser.urlencoded({ extended: true })); 
 var spawn = require('child_process').spawn,
 py    = spawn('python', ['./MachineLearning.py']),
 datas = [];
 var number;

app.post('/', function(req, res) {
    const twiml = new VoiceResponse();
    var bodies = req.body.Body.toLowerCase()


	    if(bodies == "startsurvey" && boo == 0) {

	    	client.messages
			      .create({
			        body: 'How many questions would you like to ask? (Max 10)',
			        from: 'whatsapp:+14155238886',
			        to: req.body.From
			      })
			      .then(message => console.log(message.from))
			      .done();
			      boo = 1;
			  }
		else if ( (!isNaN(bodies)) && boo == 1){
			client.messages
			      .create({
			        body: 'Enter the questions seperated by spaces (if you would like to change the number, just type it again)',
			        from: 'whatsapp:+14155238886',
			        to: req.body.From
			      })
			      .then(message => console.log(message.from))
			      .done();
			 number = bodies;
			 UserInput =  new Array(number)
			 StringInput = new Array(number)
			  }

		else if (boo == 1 && (isNaN(bodies)) ){
			for(i=0;i<bodies.length+1;i++){
				StringInput[i] = ' '
			}

			var x=0;

			bodies = bodies.replace(/\n/g, '*')
			for(var i=0;i<bodies.length;i++){
				StringInput[x] += bodies[i];
				if(bodies[i+1] == '*'){
					i += 1;
					if(StringInput[x] != ' ')
					outputString = outputString + (x+1) + '.' + StringInput[x]+ '\n' 
					x++;
				}
				if(i == bodies.length-1)
					outputString += (x+1) + '.' + StringInput[x]
			}
				client.messages
			      .create({
			        body: 'These are your survey questions:\n' + outputString,
			        from: 'whatsapp:+14155238886',
			        to: req.body.From
			      })
			      .then(message => console.log('Survey sent to host!'))
			      .done();

			    client.messages
			      .create({
			        body: 'A friend sent you a survey!\n' + outputString + '\nPlease enter only one answer per line...',
			        from: 'whatsapp:+14155238886',
			        to: 'whatsapp:+XXXXXXXXXX'
			      })
			      .then(message => console.log('Survey sent to client!'))
			      .done();
			      boo =2;
		}
		else if (boo > 1 && (isNaN(bodies)) && bodies != 'show' ){
			console.log('Inputted.')
				for(i=0;i<bodies.length+1;i++){
					UserInput[i] = ''
				}
				var x=0;
				bodies = bodies.replace(/\n/g, '*')

				for(var i=0;i<bodies.length;i++){
				UserInput[x] += bodies[i];
				if(bodies[i+1] == '*'){
					i += 1;
					x++;
				}

			}
	}
	else if(bodies == 'show'){
		var output = '';
		console.log(UserInput)
		for(var i =0;i<number;i++){
				output = output + UserInput[i] + '\n'
			}
		  client.messages
			      .create({
			        body: 'These are the responses: \n Type show to see your results\n' + output,
			        from: 'whatsapp:+14155238886',
			        to: req.body.From
			      })
			      .then(message => console.log('Survey sent to client!'))
			      .done();

		/*py.stdin.write(JSON.stringify(UserInput));
		py.stdin.end();
		py.stdout.on('data', function(data){
		  datas += data.toString();
		});

		//Once the stream is done (on 'end') we want to simply log the received data to the console.
		py.stdout.on('end', function(){
		  console.log('python ends');
		}); */
	}
	    res.writeHead(200, {'Content-Type': 'text/xml'});
	    res.end(twiml.toString());
	});


app.get('/', function (req, res) {
  res.send('Hello Wesley');
});

app.listen(80, function () {
  console.log('Application is listening in port 80.');
});
