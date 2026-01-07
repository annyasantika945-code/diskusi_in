import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOgu8RbtRmROhraUB7Nl1mJ41nAirxVk4",
  authDomain: "diskusi-in.firebaseapp.com",
  databaseURL: "https://diskusi-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "diskusi-in",
  storageBucket: "diskusi-in.firebasestorage.app",
  messagingSenderId: "823851958982",
  appId: "1:823851958982:web:5192dccfabdf69e83e8dc7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const username = localStorage.getItem("username") || "Anonim";
const messagesRef = ref(db, "messages");
const chatBox = document.getElementById("chatBox");

window.sendMessage = function () {
  const input = document.getElementById("message");
  if (input.value.trim() === "") return;

  push(messagesRef, {
    user: username,
    text: input.value
  });

  input.value = "";
};

onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();

  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");

  if (data.user === username) {
    msgDiv.classList.add("me");
  } else {
    msgDiv.classList.add("other");
  }

  msgDiv.innerHTML = `
    <div class="username">${data.user}</div>
    <div>${data.text}</div>
  `;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
