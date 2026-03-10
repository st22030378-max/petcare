const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

chatBtn.onclick = () => {
  chatBox.style.display =
  chatBox.style.display === "flex" ? "none" : "flex";
};

async function sendMessage(){

  const input = document.getElementById("userInput");
  const messages = document.getElementById("messages");

  let userText = input.value.trim();

  if(userText === "") return;

  messages.innerHTML += `<p><b>Tú:</b> ${userText}</p>`;

  input.value = "";

  try{

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer":  window.location.href,
        "X-Title": "PetCare"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: "Eres un asistente experto en cuidado de mascotas (perros, gatos, aves y peces). Responde de forma clara y útil."
          },
          {
            role: "user",
            content: userText
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();

    if(!response.ok){
      messages.innerHTML += `<p><b>Error API:</b> ${data.error?.message || "Error desconocido"}</p>`;
      return;
    }

    const aiReply = data.choices[0].message.content;

    messages.innerHTML += `<p><b>PetCare Bot:</b> ${aiReply}</p>`;

    messages.scrollTop = messages.scrollHeight;

  }catch(error){

    console.error("Error de conexión:", error);

    messages.innerHTML += `<p><b>Error:</b> No se pudo conectar con el bot.</p>`;

  }

}