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
const emojis = ["🫶", "👋", "✌️", "🖖"];

let message = "";

function getRandomElement(array) {
  if (!Array.isArray(array)) throw new Error("Not an array!", array);

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
  if (
    messageElement.innerText.length === 0 ||
    !message.includes(messageElement.innerText)
  ) {
    messageElement.innerText = "";
    message = getMessage();
  }

  if (messageElement.innerText.length === message.length)
    return setTimeout(
      getRandomElement([quickDeleteMessage, untypeMessage]),
      5000
    );

  messageElement.innerText = Array.from(message)
    .slice(0, Array.from(messageElement.innerText).length + 1)
    .join("");
  setTimeout(typeMessage, 100 - Math.round(Math.random() * 40));
}

function quickDeleteMessage() {
  messageElement.classList.add("selected");
  pipeElement.style.visibility = "hidden";

  setTimeout(() => {
    messageElement.innerText = "";
    messageElement.classList.remove("selected");
    pipeElement.style.visibility = "visible";
    typeMessage();
  }, 300);
}

function untypeMessage() {
  if (messageElement.innerText.length === 0)
    return setTimeout(typeMessage, 100);

  messageElement.innerText = removeLastChar(messageElement.innerText);
  setTimeout(untypeMessage, 40);
}

typeMessage();
