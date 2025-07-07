// 1. ייבוא ספריות Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// 2. הגדרות Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxvUtgrI5cOI9nYSh77vl8EkFtdWFxMXg",
  authDomain: "issuereporterbot.firebaseapp.com",
  projectId: "issuereporterbot",
  storageBucket: "isissuereporterbot.appspot.com",
  messagingSenderId: "142138096383",
  appId: "1:142138096383:web:5b5d3afb366bd45f36eaca"
};

// 3. אתחול Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. שליחת הטופס ל-Firebase
document.getElementById("issueForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const description = document.querySelector('textarea[name="description"]').value;
  const systemnumber = document.querySelector('input[name="systemnumber"]').value;
  const failersolved = document.querySelector('input[name="failersolved"]').value;
  const location = document.querySelector('input[name="location"]').value;
  const date = document.querySelector('input[name="date"]').value;

  const customId = "issue-" + Date.now();

  const issueData = {
    name,
    email,
    description,
    systemnumber,
    failersolved,
    location,
    date
  };

  try {
    await setDoc(doc(db, "issues", customId), issueData);
    alert("Issue submitted successfully!");
  } catch (error) {
    console.error("error", error);
    alert("Error submitting the issue.");
  }
});
