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

    // console.log(JSON.stringify(question));
    return question
}