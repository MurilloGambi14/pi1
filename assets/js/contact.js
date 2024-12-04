document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("telefone").value;
      const message = document.getElementById("mensagem").value;

      const formData = { 
          name, 
          email, 
          phone, 
          message 
      };

      try {
          const response = await fetch("http://127.0.0.1:3333/contact", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          });

          if (response.ok) {
              alert("Mensagem enviada com sucesso!");
              form.reset();
          } else {
              alert("Houve um problema ao enviar a mensagem. Tente novamente.");
          }
      } catch (error) {
          console.error("Erro:", error);
          alert("Erro ao enviar a mensagem. Verifique sua conexão e tente novamente.");
      }
  });
});
