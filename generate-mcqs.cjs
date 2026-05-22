
const fs = require("fs");
const sets = [];
for (let i = 1; i <= 2; i++) {
  const questions = [];
  let qId = 1;
  const subjects = ["Math", "English", "Physics", "Chemistry"];
  for (const subject of subjects) {
    for (let j = 0; j < 25; j++) {
      questions.push({
        id: "q" + qId,
        text: `Generic ${subject} question ${j + 1} for CSIT Entrance Exam?`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: Math.floor(Math.random() * 4),
        subject: subject
      });
      qId++;
    }
  }
  sets.push({
    setId: "set" + i,
    title: i === 1 ? "2079 Entrance Model Set" : "2080 Entrance Practice Set",
    questions: questions
  });
}
fs.writeFileSync("d:/UmeshTests/CSIT/csit-app/src/mcqData.json", JSON.stringify(sets, null, 2));
console.log("Generated JSON");

