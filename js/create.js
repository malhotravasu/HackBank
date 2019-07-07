/*global HackBank _config*/

var HackBank = window.HackBank || {};
HackBank.map = HackBank.map || {};

(function rideScopeWrapper($) {

    var authToken;
    HackBank.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
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
                body: {
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
                console.log("Success Response: ", result);
                alert('Creation Sucessful');
            },
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error creating question: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when creating your question:\n' + jqXHR.responseText);
            }
        });
    }

    // Register click handler for #request button
    $(function onDocReady() {
        $('#create').click(handleRequestClick);
        $('#signOut').click(function() {
            HackBank.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
        $('#addCase').click(addTestCase);
    });

    function handleRequestClick(event) {
        event.preventDefault();
        question = readForm();
        submitQuestion(question);
    }

    // My functions here

    function createTestCaseNode(idx) {
        var testCase = document.createElement("div");
        testCase.setAttribute("id", "testCase"+idx);
    
        let labelNode = document.createElement("label");
        labelNode.innerHTML = "Test Case " + (idx+1);
        let inputNode = document.createElement("textarea");
        inputNode.setAttribute("id", "sampleInput"+idx);
        let outputNode = document.createElement("textarea");
        outputNode.setAttribute("id", "sampleOutput"+idx);
    
        testCase.appendChild(labelNode);
        testCase.appendChild(inputNode);
        testCase.appendChild(outputNode);
        return testCase;
    }
    
    function addTestCase() {
        var testContainer = document.getElementById("testCaseWrap");
        var idx = testContainer.children.length;
    
        var newTestCase = createTestCaseNode(idx);
        testContainer.appendChild(newTestCase);
    }

    function readForm() {
        question = {};
        question.qname = document.getElementById("qname").value;
        question.desc = document.getElementById("desc").value;
        question.inf = document.getElementById("inf").value;
        question.outf = document.getElementById("outf").value;
        question.constraints = document.getElementById("constraints").value;
        
        question.stcases = [];
        var testContainer = document.getElementById("testCaseWrap");
        let stcases = testContainer.children.length;
        for (let i=0; i<stcases; i++)
        {
            let testCase = [];
            testCase[0] = document.getElementById("sampleInput"+i).value;
            testCase[1] = document.getElementById("sampleOutput"+i).value;
            question.stcases[i] = testCase;
        }
    
        return question
    }

} (jQuery));
