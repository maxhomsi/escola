document.addEventListener('DOMContentLoaded', () => {

    // --- Efeito de transição suave ao sair da página ---
    const activityButtons = document.querySelectorAll('a.activity-sticker');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    activityButtons.forEach(button => {
        button.addEventListener('click', function(event) {
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
        title.style.minHeight = title.clientHeight + 'px'; // Previne que o layout pule
        let i = 0;
        
        // Atraso para começar a animação depois do fade-in da página
        setTimeout(() => {
            const typingEffect = setInterval(() => {
                if (i < text.length) {
                    title.innerHTML += text.charAt(i) === ' ' ? '&nbsp;' : text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, 100); // Velocidade da digitação
        }, 500); // Atraso inicial
    }

    // --- Animação de entrada geral ---
    const fadeInElement = document.querySelector('.fade-in');
    if (fadeInElement && !motionQuery.matches) {
        // Apenas um fade-in simples para o caderno como um todo
        fadeInElement.style.animation = `fadeInAnimation 0.8s ease forwards 0.2s`;
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            .fade-in { opacity: 0; }
            @keyframes fadeInAnimation {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});