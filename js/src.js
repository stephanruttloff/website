const pipe = document.getElementById("pipe");
const messageElement = document.getElementById("message");
const messages = [
  "Hallo",
  "Hi",
  "Hello",
  "Greetings",
  "Hey",
  "Hello World",
  "48 65 6C 6C 6F",
  ["nuqneH"],
  ["SYN", "~=[,,_,,]:3", "ʕ·ᴥ·ʔ", " 👁️ 👄 👁️ "],
];
const greetings = ["🫶", "👋", "✌️"];
const deleteActions = [quickDeleteMessage, untypeMessage];

let message = "";

function getRand(max) {
  return Math.round(Math.random() * max);
}

function getMessage() {
  const m = messages[getRand(messages.length - 1)];
  const result = Array.isArray(m)
    ? m[getRand(m.length - 1)]
    : m + " " + greetings[getRand(greetings.length - 1)];
  return result == message ? getMessage() : result;
}

setInterval(() => {
  pipe.classList.contains("light")
    ? pipe.classList.remove("light")
    : pipe.classList.add("light");
}, 800);

function select() {
  messageElement.classList.add("selected");
}

function typeMessage() {
  if (
    messageElement.innerText.length === 0 ||
    !message.includes(messageElement.innerText)
  ) {
    messageElement.innerText = "";
    message = getMessage();
  }

  if (messageElement.innerText.length === message.length) {
    setTimeout(
      deleteActions[
        Math.round(Math.random() * Math.max(deleteActions.length - 1, 0))
      ],
      5000
    );
    return;
  }

  messageElement.innerText = Array.from(message)
    .slice(0, messageElement.innerText.length + 1)
    .join("");

  setTimeout(typeMessage, 120 - Math.round(Math.random() * 40));
}

function quickDeleteMessage() {
  messageElement.classList.add("selected");
  pipe.style.visibility = "hidden";

  setTimeout(() => {
    messageElement.innerText = "";
    messageElement.classList.remove("selected");
    pipe.style.visibility = "visible";
    typeMessage();
  }, 300);
}

function untypeMessage() {
  if (messageElement.innerText.length === 0) {
    setTimeout(typeMessage, 100);
    return;
  }

  messageElement.innerText = Array.from(messageElement.innerText)
    .slice(0, messageElement.innerText.length - 2)
    .join("");

  setTimeout(untypeMessage, 100);
}

typeMessage();
