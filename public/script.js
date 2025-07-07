document.getElementById("issueForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("התקלה נשלחה בהצלחה!");
});
document.getElementById("issueForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // מונע רענון של הדף

  // קבלת הערכים מהשדות
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const description = document.querySelector('textarea[name="description"]').value;
  const systemnumber = document.querySelector('input[name="system number"]').value;
  const date = document.querySelector('input[name="date"]').value;
  const location = document.querySelector('input[name="location"]').value;


  // יצירת מזהה באנגלית
  const customId = "issue-" + Date.now();

  // יצירת אובייקט עם הנתונים
  const issueData = {
    name,
    email,
    description,
    systemnumber,
    location,
    date: new Date().toISOString()
  };

  // שליחה ל-Firebase
  try {
    await setDoc(doc(db, "issues", customId), issueData);
    alert("הדיווח נשלח בהצלחה!");
  } catch (error) {
    console.error("שגיאה בשליחה:", error);
    alert("אירעה שגיאה בשליחת הדיווח.");
  }
});
