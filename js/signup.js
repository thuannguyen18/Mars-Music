// validation form register and register user local storage
const inputUsernameRegister = document.querySelector(".input-signup-username");
const inputPasswordRegister = document.querySelector(".input-signup-password");
const btnRegister = document.querySelector(".signup__signInButton");
const checkbox1 = document.getElementById('checkbox1')
const checkbox2 = document.getElementById('checkbox2')
const inputEmailRegister = document.querySelector(".input-signup-email");


// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputUsernameRegister.value === "" ||
    inputPasswordRegister.value === "" 
  ) {
    alert("Vui lòng không để trống");
  } else if (checkbox1.checked != true || checkbox2.checked != true) {
      alert("Vui lòng chấp nhận điều khoản")
    } else {
    // array user
    console.log(inputEmailRegister.value)
    const user = {
      username: inputUsernameRegister.value,
      password: inputPasswordRegister.value,
      email: inputEmailRegister.value,
    };
    let json = JSON.stringify(user);
    localStorage.setItem('account', json);
    alert("Đăng Ký Thành Công");
    window.location.href = "login.html";
  }
});
