import axios from "axios";
// Declaration of Plan and Suite
let planID = 108846, suiteID = 145960
Cypress.Commands.add("setTestCaseStatusIntoAzures", async function (testcaseID, status) {
  // (testcaseID,status) getting testcaseID from TFS using description

  if (global.testCaseId === undefined) {
    console.log("testcaseID is undefined", global.testCaseId);
  } else {
    //getting Pointid from azure API
    let pointId = await axios({
      method: "get",
      url: "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/plans/" + planID + "/suites/" + suiteID + "/points?testcaseId=" + testcaseID + "&api-version=5.1",
      headers: {
        authorization: global.Selectors.general.basic_Auth,
      },
    }).then((response) => {
      return response.data.value[0].id;
    });
    createRun(pointId, testcaseID, status);
  }
});

//create run
const createRun = async (pointID, testcaseID, status) => {
  let runID = await axios({
    method: "POST",
    url: "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/runs?api-version=7.0",
    headers: {
      authorization: global.Selectors.general.basic_Auth,
    },
    data: {
      name: testcaseID,
      plan: {
        id: planID,
      },
      pointIds: [pointID],
    },
  }).then((response) => {
    return response.data.id;
  });

  //Getting testresult id through runID
  let resultID = await gettestResultID(runID);
  //Updating Status Passed or Failed into TFS PATCH Call
  updateResult(runID, resultID, status);
};

//update result
const updateResult = async (runID, resultID, status) => {
  var comment;
  if (status.toString() === "PASSED") {
    comment = "Execution Passed!!!";
    await axios({
      method: "PATCH",
      url: "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/" + runID + "/results?api-version=7.0",
      headers: {
        authorization: global.Selectors.general.basic_Auth,
      },
      data: [
        {
          id: resultID.toString(),
          outcome: status.toString(),
          state: "Completed",
          comment: comment.toString(),
        },
      ],
    })
  }
  else if (status.toString() === "FAILED") {
    comment = "Execution Failed!!!";
    await axios({
      method: "PATCH",
      url:
        "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/" + runID + "/results?api-version=7.0",
      headers: {
        authorization: global.Selectors.general.basic_Auth,
      },
      data: [
        {
          id: resultID.toString(),
          outcome: status.toString(),
          state: "Completed",
          comment: comment.toString(),
        },
      ],
    });
  }
}

const gettestResultID = async (runID) => {
  return await axios({
    method: "GET",
    url:
      "https://*******.visualstudio.com/Network%20and%20Operations/_apis/test/Runs/" + runID + "/results?api-version=7.0",
    headers: {
      authorization: global.Selectors.general.basic_Auth,
    },
  }).then((response) => {
    return response.data.value[0].id;
  });
};

