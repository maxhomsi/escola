document.addEventListener('DOMContentLoaded', () => {

    // --- SOM DE CLIQUE ---
    const clickSound = new Audio('data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAZAAAB5oCltT////////////////////////////////////////////8AAAAATGF2YzU4LjQ1AAAAAAAAAAAAAAAAJ08AAAAAAAAAAAEAAAI4/3//tAwRAAAAAAAAZVgAAAAAAAARWVoCAAAAAAABAKoAAAAAAAAAAAAAAADN12+QAIACIQD//uR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMYXZmNTguNDUuMTAw//uR4AQAAAPOUAAAAAAAAVmWoAQAAAAAAAQAKoAAAAAAAAAAAAAAAM3Xb5AACAEQgA//uR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMYXZmNTguNDUuMTAw//uR4AgAAAPcoAAAAAAAAVmagAgAAAAAAAQAKoAAAAAAAAAAAAAAAM3Xb5AACAEQgA//uR4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMYXZmNTguNDUuMTAw');
    clickSound.volume = 0.4;
    
    // Variavel de controle para garantir que o áudio seja iniciado por um usuário
    let userHasInteracted = false;
    
    // Listener no corpo do documento para detectar a primeira interação do usuário
    document.body.addEventListener('click', () => {
        userHasInteracted = true;
    }, { once: true });


    // Função para tocar o som de forma segura
    function playClickSound() {
        // Apenas toca o som se o usuário já tiver interagido com a página
        if (userHasInteracted) {
            clickSound.currentTime = 0;
            clickSound.play().catch(error => {
                // O catch previne erros caso a reprodução falhe por algum motivo
                console.error("Erro ao tocar o áudio:", error);
            });
        }
    }

    // --- Efeito de transição suave ao sair da página ---
    const activityButtons = document.querySelectorAll('a.activity-card');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    activityButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            if (!motionQuery.matches) {
                playClickSound();
            }
            if (motionQuery.matches) { return; }
            event.preventDefault();
            const destination = this.href;
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = destination;
            }, 400);
        });
    });

    // --- Animação de digitação para o título ---
    const title = document.getElementById('main-title');
    if (title && !motionQuery.matches) {
        const text = title.innerText;
        title.innerText = ''; 
        
        setTimeout(() => {
            let i = 0;
            const typingEffect = setInterval(() => {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, 90);
        }, 500);
    }

    // --- Animação de entrada geral para o caderno ---
    const fadeInElement = document.querySelector('.fade-in');
    if (fadeInElement && !motionQuery.matches) {
        fadeInElement.style.animation = `fadeInAnimation 0.8s ease-out forwards 0.2s`;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            .fade-in { opacity: 0; }
            @keyframes fadeInAnimation {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});