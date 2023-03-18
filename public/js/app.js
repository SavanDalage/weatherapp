const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  message1.textContent = "Loading...";
  message2.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (message1.textContent = data.error);
        }
        message1.textContent = data.exact_location;
        message2.textContent = data.forecast;
      });
    }
  );

  //   const btn = document.getElementById("btn");
  //   btn.addEventListener("click", function handleClick(e) {
  //     e.preventDefault();
  //     document.querySelector("input").value = "";
  //   });
});
