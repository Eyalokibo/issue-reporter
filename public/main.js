// 1. ייבוא ספריות Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// 2. הגדרות Firebase שלך (העתק מה-Firebase Console שלך)
const firebaseConfig = {
  apiKey: "AIzaSyAxvUtgrI5cOI9nYSh77vl8EkFtdWFxMXg",
  authDomain: "issuereporterbot.firebaseapp.com",
  projectId: "issuereporterbot",
  storageBucket: "issuereporterbot.firebasestorage.app",
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

  const customId = "issue-" + Date.now();

  const issueData = {
    name,
    email,
    description,
    date: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, "issues", customId), issueData);
    alert("הדיווח נשלח בהצלחה!");
  } catch (error) {
    console.error("שגיאה בשליחה:", error);
    alert("אירעה שגיאה בשליחת הדיווח.");
  }
});
