/*global HackBank _config*/

var HackBank = window.HackBank || {};
HackBank.map = HackBank.map || {};

(function rideScopeWrapper($) {

    var authToken;
    HackBank.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
            console.log("Your Auth Token is:", authToken);
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function submitQuestion(question) {
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/create',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                Item: {
                    "Constraints": question.constraints,
                    "Description": question.desc,
                    "Input Format": question.inf,
                    "Output Format": question.outf,
                    "Question Name": question.qname,
                    "Sample Test Cases": question.stcases
                }
            }),
            contentType: 'application/json',
            success: function createSuccess(result) {
                console.log(result);
                alert('Creation Sucessful');
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error creating question: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when creating your question:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#create').click(handleRequestClick);
        $('#signOut').click(function() {
            HackBank.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
    });

    function handleRequestClick(event) {
        event.preventDefault();
        question = {};

        question.constraints = "TEST CONSTRAINTS";
        question.desc = "TEST DESCRIPTION";
        question.inf = "TEST INPUT FORMAT";
        question.outf = "TEST OUTPUT FORMAT";
        question.qname = "TEST QUESTION";
        question.stcases = [
            ["TEST INPUT", "TEST OUTPUT"]
        ];

        submitQuestion(question);
    }
} (jQuery));
