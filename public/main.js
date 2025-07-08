document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("issueForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("🔄 טופס נשלח – מתחילים עיבוד");

    // קריאת ערכים מהטופס
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const systemnumber = document.querySelector('input[name="systemnumber"]').value;
    const location = document.querySelector('input[name="location"]').value;
    const failersolved = document.querySelector('input[name="failersolved"]').value;
    const date = document.querySelector('input[name="date"]').value;

    const issueData = {
      name,
      email,
      description,
      systemnumber,
      location,
      failersolved,
      date
    };

    try {
      const response = await fetch("https://issue-reporter.onrender.com/submit_issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueData)
      });

      const text = await response.text(); // תגובת שרת גולמית
      console.log("📨 תגובת שרת (raw):", text);

      if (!text) {
        alert("⚠️ השרת לא החזיר תגובה.");
        return;
      }

      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error("⚠️ לא ניתן לפענח JSON:", parseError);
        alert("שגיאה: תגובת שרת לא תקינה.");
        return;
      }

      if (response.ok) {
        // ✅ מעבר לדף הצלחה
        window.location.href = "success.html";
      } else {
        alert("❌ שגיאה בשרת: " + (result.message || "לא ידועה"));
      }

    } catch (error) {
      console.error("🔥 שגיאת fetch:", error);
      alert("אירעה שגיאה בעת שליחת הדיווח.");
    }
  });
});
