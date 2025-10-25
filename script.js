const BASE_URL = "https://studysphere-ai.onrender.com";

const subjectSelect = document.getElementById("subject");
const chapterSelect = document.getElementById("chapter");
const notesOutput = document.getElementById("notesOutput");
const mockTestOutput = document.getElementById("mockTestOutput");
const samplePaperOutput = document.getElementById("samplePaperOutput");
const doubtInput = document.getElementById("doubtInput");
const doubtAnswer = document.getElementById("doubtAnswer");

async function generateNotes() {
  notesOutput.innerHTML = "Generating notes...";
  const res = await fetch(`${BASE_URL}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: subjectSelect.value, chapter: chapterSelect.value }),
  });
  const data = await res.json();
  notesOutput.innerHTML = data.notes || "No notes returned.";
}

async function generateMockTest() {
  mockTestOutput.innerHTML = "Generating mock test...";
  const res = await fetch(`${BASE_URL}/api/mocktest`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: subjectSelect.value, chapter: chapterSelect.value }),
  });
  const data = await res.json();
  mockTestOutput.innerHTML = data.test || "No mock test returned.";
}

async function generateSamplePaper() {
  samplePaperOutput.innerHTML = "Generating sample paper...";
  const res = await fetch(`${BASE_URL}/api/samplepaper`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: subjectSelect.value }),
  });
  const data = await res.json();
  samplePaperOutput.innerHTML = data.paper || "No sample paper returned.";
}

async function solveDoubt() {
  doubtAnswer.innerHTML = "Thinking...";
  const res = await fetch(`${BASE_URL}/api/doubt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject: subjectSelect.value, question: doubtInput.value }),
  });
  const data = await res.json();
  doubtAnswer.innerHTML = data.answer || "No answer returned.";
}
