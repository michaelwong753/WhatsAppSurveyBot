# SFHacks2019_TwillioSubmission_WhatsAppSurveyBot
A bot that helps create a survey and send that survey to other people through whatsapp and integrated with AI to analyze positive or negative responses
# Installation
Install dependencies
```sh
1. Express
2. Body Parser
3. Twillio
```
# Usage
Input phone number to the person who want to send your survey to
```sh
[Line 85]... whatsapp:+XXXXXXXXXX ... 
```
Make a whatsapp sandbox in twillio, click [this link](https://www.twilio.com/docs/sms/whatsapp/api) and Invite the person to the sandbox

![](pic1.png)

To start the survey, type 
```sh
  StartSurvey
  ```
<img src="pic2.png" width="30%">
 
 # This is the response
<img src="pic4.jpg" width="30%">
 
 # This is how you take the result
<img src="pic3.png" width="30%">
 
 # Machine Learning Model
 > Predicting sentiment text from survey input
 
 
 [Library usage](https://github.com/sodagembira/SFHacks2019_TwillioSubmission_WhatsAppSurveyBot/blob/master/MachineLearning.py)
 
 
 Havent integrated the AI model to the bot in yet (from python to nodejs)
