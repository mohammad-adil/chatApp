const socket = io();
//elements

const messageForm = document.querySelector("#message-form");
const locationButton = document.querySelector("#send-location");
const messageFormInput = messageForm.querySelector("input");
const messageFormButton = messageForm.querySelector("button");
const messages = document.querySelector("#messages");

///template
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;

///options

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("hh:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (message) => {
  const html = Mustache.render(locationMessageTemplate, {
    url: message.url,
    createdAt: moment(message.createdAt).format("hh:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //disable button
  messageFormButton.setAttribute("disabled", "disabled");
  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, (error) => {
    //enable button
    messageFormButton.removeAttribute("disabled");
    messageFormInput.value = "";
    messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log("Message delivered!");
  });
});

locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }
  locationButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        locationButton.removeAttribute("disabled");
        console.log("Location shared!");
      }
    );
  });
});

socket.emit("join", { username, room });
