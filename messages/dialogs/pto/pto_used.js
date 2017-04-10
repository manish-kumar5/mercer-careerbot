var builder = require('botbuilder');
var format = require("string-template");
var compile = require("string-template/compile");

// {1} = only
// {5} = planned approved leaves 
var PTOUsed_Template = compile(
    `<b>Dear {0}</b>, You've {1} used {2} of your {3} vacation days available this year. You have {4} upcoming days scheduled:
• {5}

Note: Vacation time can only be taken in full day increments.<br>
<a href="#">Read our vacaction policy</a> | <a href="#">Request vacation time</a> | <a href="#">Employment law</a>

Related topics: <br>
<input type="button" onclick="hello(this)" value="Company Holidays" id="Company Holidays"><br>
<input type="button" onclick="hello(this)" value="Sick Days" id="Sick Days"><br>
<input type="button" onclick="hello(this)" value="Leave of Absence" id="Leave of Absence"><br>
<input type="button" onclick="hello(this)" value="Sabbatical Policy" id="Sabbatical Policy"><br>
<input type="button" onclick="hello(this)" value="Short Term Disability" id="Short Term Disability"><br>
<input type="button" onclick="hello(this)" value="Long Term Disability" id="Long Term Disability">

`
    );

module.exports = [
    function (session) {
        var msg_out = PTOUsed_Template();
        builder.Prompts.text(session, msg_out);
    }

];