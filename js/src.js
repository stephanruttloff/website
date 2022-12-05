const pipeElement = document.getElementById("pipe");
const messageElement = document.getElementById("message");

const messages = [
  "Hallo",
  "Hi",
  "Hello",
  "Greetings",
  "Hey",
  "Howdy",
  "Moin",
  "G'Day, Mate",
  [
    "~=[,,_,,]:3",
    "ʕ·ᴥ·ʔ",
    "👁️ 👄 👁️",
    "48 65 6C 6C 6F",
    ".... . .-.. .-.. ---",
    "Wake up, Neo...",
    "Follow the white rabbit.",
    "☕️",
  ],
];
const emojis = ["👋", "✌️", "🖖"];

let message = "";
let view = "";

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getMessage() {
  const e = getRandomElement(messages);
  const m = Array.isArray(e) ? getRandomElement(e) : e;

  return message.startsWith(m)
    ? getMessage()
    : Array.isArray(e)
    ? m
    : m + " " + getRandomElement(emojis);
}

function removeLastChar(o) {
  return Array.from(o).slice(0, -1).join("");
}

function typeMessage() {
  if (view.length === 0 || !message.includes(view)) {
    view = "";
    message = getMessage();
  }

  if (view.length === message.length)
    return setTimeout(
      getRandomElement([quickDeleteMessage, untypeMessage]),
      5000
    );

  messageElement.innerText = view = Array.from(message)
    .slice(0, Array.from(view).length + 1)
    .join("");
  setTimeout(typeMessage, 100 - Math.round(Math.random() * 40));
}

function quickDeleteMessage() {
  messageElement.classList.add("selected");
  pipeElement.style.visibility = "hidden";

  setTimeout(() => {
    messageElement.innerText = view = "";
    messageElement.classList.remove("selected");
    pipeElement.style.visibility = "visible";
    typeMessage();
  }, 300);
}

function untypeMessage() {
  if (view.length === 0) return setTimeout(typeMessage, 100);

  messageElement.innerText = view = removeLastChar(view);
  setTimeout(untypeMessage, 40);
}

typeMessage();
