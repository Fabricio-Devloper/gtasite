/* ============================================================
    GTA VI — COMPORTAMENTO DA PÁGINA (JavaScript)
   ============================================================ */

// Sempre começar a página no topo (o pin da capa depende disso).
// O ScrollTrigger tem a memória DELE, separada da do navegador — limpa as duas.
ScrollTrigger.clearScrollMemory("manual");
window.scrollTo(0, 0);

/* ------------------------------------------------------------
    1. O MENU QUE SOME AO ROLAR
   ------------------------------------------------------------ */
const menu = document.getElementById("menu");

window.addEventListener("scroll", function () {
    // depois dos primeiros 50px, o menu sai da tela.
    // volta sozinho quando a pessoa chega no topo de novo.
    if (window.scrollY > 50) {
        menu.classList.add("menu-rolado");
    } else {
        menu.classList.remove("menu-rolado");
    }
});

/* ------------------------------------------------------------
    2. OS BLOCOS QUE APARECEM AO ENTRAR NA TELA
   ------------------------------------------------------------ */
const blocos = document.querySelectorAll(".aparecer");

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

blocos.forEach(function (bloco) {
    observador.observe(bloco);
});

/* ------------------------------------------------------------
    3. O VÍDEO DA CAPA QUE ANDA COM O SCROLL
   ------------------------------------------------------------ */
gsap.registerPlugin(ScrollTrigger);

const video = document.querySelector(".capa-video");

function animarCapa() {
    const linhaDoTempo = gsap.timeline({
        scrollTrigger: {
            trigger: ".capa",
            start: "top top",
            end: "+=2500",
            scrub: 1,
            pin: true
        }
    });

    linhaDoTempo.to(".capa-conteudo, .capa-barra, .capa-seta", {
        opacity: 0,
        scale: 0.6,
        duration: 0.1
    }, 0);

    linhaDoTempo.to(video, { opacity: 1, duration: 0.8 }, 0);

    linhaDoTempo.to(video, {
        currentTime: video.duration,
        duration: 1,
        ease: "none"
    }, 0);
}

if (video.readyState >= 1) {
    animarCapa();
} else {
    video.addEventListener("loadedmetadata", animarCapa);
}