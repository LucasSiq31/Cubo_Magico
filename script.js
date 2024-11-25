progresso = document.getElementById('progresso');
passos = 8;
passo = 0;
porcentagem = 0;
cores = ['#1ae246', '#e29c1a', '#1ab3e2', '#e21a1a', '#ffee00', '#1ae246', '#e29c1a', '#1ab3e2'];

function mudarPasso(valor){
    //Volta 1 passo
    if(valor == -1){
        passo -= 1;

    }else if(valor == 1){
        passo += 1;
    }

    if(passo == 0){
        passo = 1;

    }else if(passo == 9){
        passo = 8;
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Faz a rolagem ser suave
        });

        porcentagem = (100/passos)*passo;

        progresso.style.width = porcentagem + "%";
        progresso.style.background = cores[passo-1];

        for (let i = 1; i <= passos; i++) {
            const stepDiv = document.getElementById(`passo${i}`);
            if (i === passo) {
              stepDiv.style.display = "block";
            } else {
              stepDiv.style.display = "none";
            }
        }

        if(passo == 8){
            releaseConfetti();
        }
    }
}

function comecar() {
    // Esconde a introdução
    const start = document.getElementById('start');
    start.style.display = 'none';
    document.getElementById('passo-passo').style.display = 'flex';

    mudarPasso(1)
}



  // Define a função de confetes
  function releaseConfetti() {
    // Cria o canvas se ainda não existir
    let canvas = document.getElementById("confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "confetti-canvas";
      canvas.style.position = "fixed";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.pointerEvents = "none"; // Garante que o canvas não interfira na interação do usuário
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiArray = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#03a9f4', '#4caf50', '#ffeb3b', '#ff9800'];

    function createConfetti() {
      for (let i = 0; i < 300; i++) {
        confettiArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          r: Math.random() * 6 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: Math.random() * 4 - 2,
          velocityY: Math.random() * 5 + 2,
          opacity: Math.random(),
          tilt: Math.random() * 10 - 5,
        });
      }
    }

    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiArray.forEach((confetti, index) => {
        ctx.beginPath();
        ctx.arc(confetti.x, confetti.y, confetti.r, 0, 2 * Math.PI);
        ctx.fillStyle = confetti.color;
        ctx.globalAlpha = confetti.opacity;
        ctx.fill();
        confetti.x += confetti.velocityX;
        confetti.y += confetti.velocityY;
        confetti.tilt += Math.random() * 2 - 1;

        if (confetti.y > canvas.height || confetti.opacity <= 0) {
          confettiArray.splice(index, 1);
        }
      });
    }

    function animateConfetti() {
      drawConfetti();
      if (confettiArray.length > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.body.removeChild(canvas); // Remove o canvas após a animação
      }
    }

    // Inicia o processo de confetes
    createConfetti();
    animateConfetti();

    // Atualiza o tamanho do canvas ao redimensionar a janela
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

