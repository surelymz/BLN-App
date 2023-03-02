function summarize() {
  const text = document.getElementById("text").value;
  const subject = document.getElementById("subject").value;
  const length = document.getElementById("length").value;
  
  fetch("/summarize?text=" + encodeURIComponent(text) + "&subject=" + encodeURIComponent(subject) + "&length=" + encodeURIComponent(length))
    .then(response => response.json())
    .then(data => {
      document.getElementById("summary").innerHTML = "<h2>Summary:</h2><p>" + data.summary + "</p>";
      document.getElementById("context").innerHTML = "<h2>Context:</h2><p>" + data.context + "</p>";
    });
}
