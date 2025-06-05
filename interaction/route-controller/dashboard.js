document.addEventListener("DOMContentLoaded", () => {
  const sosButton = document.getElementById("sosButton");
  const photoButton = document.getElementById("photoButton");
  const dashboardOuter = document.querySelector(".dashboard-outer");

  // Caminhos das imagens
  const imgSOS = "../public/images/Bombeiros.jpg";
  const imgPhoto = "../public/images/pessoa-telefone.jpg";

  // Função para trocar o background
  function setDashboardBg(imgPath) {
    dashboardOuter.style.setProperty("--dashboard-bg", `url('${imgPath}')`);
  }

  // Hover SOS
  sosButton.addEventListener("mouseenter", () => setDashboardBg(imgSOS));
  sosButton.addEventListener("mouseleave", () => setDashboardBg(imgPhoto));

  // Hover Photo
  photoButton.addEventListener("mouseenter", () => setDashboardBg(imgPhoto));
  photoButton.addEventListener("mouseleave", () => setDashboardBg(imgPhoto));

  // Inicializa com a imagem padrão (foto)
  setDashboardBg(imgPhoto);

  // Função para lidar com o botão SOS
  sosButton.addEventListener("click", () => {
    // Aqui você pode adicionar a lógica para chamar os bombeiros
    // Por exemplo, abrir um modal de confirmação ou fazer uma chamada de emergência
    alert("Chamando serviço de emergência...");
    // Implementar a lógica real de chamada de emergência aqui
  });

  // Função para lidar com o botão de foto
  photoButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "enviar-foto.html";
  });
});
