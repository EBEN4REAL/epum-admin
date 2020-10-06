

let token;
if (
  localStorage.getItem("userDetails") === null ||
  localStorage.getItem("userDetails") === "null"
) {
  token = null;
} else {
  token = JSON.parse(localStorage.getItem("userDetails")).token;
}

let configObject = null;
if (token !== null) {
  configObject = {
    // apiBaseUrl: "https://api.epump.com.ng",
    apiBaseUrl: "https://testapi.epump.com.ng",
    authConfig: {
      headers: { Authorization: "bearer " + token }
    },
  };
} else {
  configObject = {
    // apiBaseUrl: "https://api.epump.com.ng",
    apiBaseUrl: "https://testapi.epump.com.ng", 
    authConfig: null,
  };
}
export default configObject;
