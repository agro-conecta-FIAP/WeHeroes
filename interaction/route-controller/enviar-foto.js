document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enviarFotoForm");
  const fotoInput = document.getElementById("foto");
  const comentarioInput = document.getElementById("comentario");

  // Preview opcional (pode ser removido se não quiser mostrar preview)
  fotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      // Apenas para feedback visual, não obrigatório
      if (!document.getElementById("foto-preview")) {
        const img = document.createElement("img");
        img.id = "foto-preview";
        img.alt = "Pré-visualização da foto selecionada";
        img.style.maxWidth = "100%";
        img.style.margin = "0.5rem 0";
        fotoInput.parentNode.insertBefore(img, comentarioInput);
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById("foto-preview").src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para um backend ou mostrar um feedback
    alert("Foto e comentário enviados com sucesso!");
    form.reset();
    const preview = document.getElementById("foto-preview");
    if (preview) preview.remove();
    window.location.href = "dashboard.html";
  });
});
