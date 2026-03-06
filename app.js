const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

chatBtn.onclick = () => {
  chatBox.style.display =
  chatBox.style.display === "flex" ? "none" : "flex";
};

async function sendMessage(){

const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

let userText = input.value;

if(userText === "") return;

messages.innerHTML += "<p><b>Tú:</b> " + userText + "</p>";

input.value = "";

try{

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost",
    "X-Title": "PetCare"
  },
  body: JSON.stringify({
   model: "meta-llama/llama-3-8b-instruct",
    messages: [
      {
        role: "system",
        content: "Eres un asistente que ayuda con cuidados de mascotas."
      },
      {
        role: "user",
        content: userText
      }
    ]
  })
});

const data = await response.json();

console.log("Respuesta completa:", data);
console.log("Error exacto:", data.error);

if(data.error){
messages.innerHTML += "<p><b>Error API:</b> " + data.error.message + "</p>";
return;
}

const aiReply = data.choices[0].message.content;

messages.innerHTML += "<p><b>PetCare Bot:</b> " + aiReply + "</p>";

}catch(error){

console.log("Error de conexión:", error);

messages.innerHTML += "<p><b>Error:</b> No se pudo conectar con el bot.</p>";

}

}