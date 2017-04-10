"use strict";

require('dotenv-extended').load();
var builder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var restify = require('restify');


var useEmulator = (process.env.NODE_ENV == 'development');

//useEmulator = true;

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', function (session) {
    session.send('You said ' + session.message.text);
});

var instructions = `<b> <p>I am Debbie, your AI support specialist. What can I help you with today?</p></b> <br> I can answer questions related to paid time offs,
 help you find answers around company benefits/ policies for pregnant employee and her Baby, or assist with your salary payment details/ schedules etc. To make things easier you can also choose from the options below<br>
        <input type="button" onclick="hello(this)" value="Paid Time Offs" id="Paid Time Offs"><br>
        <input type="button" onclick="hello(this)" value="Mother & Baby policies" id="Mother & Baby policies"><br>
        <input type="button" onclick="hello(this)" value="Salary Queries" id="Salary Queries">`;

bot.on('conversationUpdate', function (activity) {
    // when user joins conversation, send instructions
    if (activity.membersAdded) {
        activity.membersAdded.forEach(function (identity) {
            if (identity.id === activity.address.bot.id) {
                var reply = new builder.Message()
                            .address(activity.address)
                            .text(instructions);
                bot.send(reply);
                //bot.beginDialog(activity.address, 'init');
            }
        });
    }
});

if (useEmulator) {
    var restify = require('restify');
    var server = restify.createServer();
    server.listen(3978, function() {
        console.log('test bot endpont at http://localhost:3978/api/messages');
    });
    server.post('/api/messages', connector.listen());    
} else {
    module.exports = { default: connector.listen() }
}
