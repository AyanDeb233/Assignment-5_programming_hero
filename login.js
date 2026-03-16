console.log("winter is coming");

document.getElementById("btn-login").addEventListener("click", function () {
  //1. get the all input as value
  const inputName = document.getElementById("input-name");
  const nameValue = inputName.value;
  console.log(nameValue);
  const inputPassword = document.getElementById("input-password");
  const passwordValue = inputPassword.value;
  console.log(passwordValue);

  // give confirm alert otherwise return ticket
  if (nameValue == "admin" && passwordValue == "admin123") {
    alert("login Successful");
    window.location.assign("/homepage.html");
  } else {
    alert("login failed.please try again");
    return;
  }
});
