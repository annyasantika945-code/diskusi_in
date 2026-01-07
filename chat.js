// 🔥 Import Firebase SDK (WAJIB pakai type="module")
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔐 Firebase config (PUNYAMU)
const firebaseConfig = {
  apiKey: "AIzaSyDOgu8RbtRmROhraUB7Nl1mJ41nAirxVk4",
  authDomain: "diskusi-in.firebaseapp.com",
  databaseURL: "https://diskusi-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "diskusi-in",
  storageBucket: "diskusi-in.firebasestorage.app",
  messagingSenderId: "823851958982",
  appId: "1:823851958982:web:5192dccfabdf69e83e8dc7"
};

// 🚀 Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 👤 Ambil username dari login
const username = localStorage.getItem("username");
if (!username) {
  window.location.href = "index.html";
}

// 📌 Referensi database (room chat)
const messagesRef = ref(database, "messages");

// 📤 Fungsi kirim pesan (dipanggil dari tombol)
window.sendMessage = function () {
  const input = document.getElementById("message");
  const text = input.value.trim();
  if (text === "") return;

  push(messagesRef, {
    user: username,
    text: text,
    time: Date.now()
  });

  input.value = "";
};

// 📥 Terima pesan REAL-TIME (beda HP)
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.className = "msg " + (data.user === username ? "me" : "other");
  div.textContent = `${data.user}: ${data.text}`;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
