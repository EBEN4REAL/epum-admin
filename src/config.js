

let token;
if (
  localStorage.getItem("adminUserDetails") === null ||
  localStorage.getItem("adminUserDetails") === "null"
) {
  token = null;
} else {
  token = JSON.parse(localStorage.getItem("adminUserDetails")).token;
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
