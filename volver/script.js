const reasons = [
    "Te pienso todos los días.",
    "Porque creo que el amor puede nacer de nuevo.",
    "La vida tiene otro brillo cuando estás tú.",
    "Aún te sueño.",
    "Echo de menos reír contigo.",
    "Las cosas bonitas no se borran.",
    "Tu voz siempre fue mi calma.",
    "Todavía siento que hay amor.",
    "Lo que tuvimos sigue firme aunque haya pasado el tiempo.",
    "No quiero alejarme de ti.",
    "Hasta lo difícil lo podríamos superar juntos.",
    "Contigo aprendí lo que significa cuidar.",
    "Hay cosas de mí que solo tú entendías.",
    "Hay caminos que solo quiero recorrer contigo.",
    "La confianza también puede reconstruirse.",
    "Quisiera corregir lo que salió mal, no soltarte.",
    "Contigo incluso el caos tenía sentido.",
    "Tu mirada siempre me daba paz.",
    "A tu lado sentía hogar.",
    "Te llegué a amar profundamente, y aún lo hago.",
    "Nuestras manos todavía encajan.",
    "Lo complicado también puede sanar.",
    "Sigues siendo mi lugar seguro.",
    "Los días contigo eran mejores.",
    "Quiero sanar contigo, no lejos de ti.",
    "Tú me enseñaste a amar.",
    "Extraño tus pequeñas manías.",
    "Tu contacto me daba tranquilidad.",
    "Hasta tus silencios me hablaban.",
    "No quiero rendirme.",
    "Quiero verte crecer y estar contigo.",
    "Quiero envejecer a tu lado.",
    "Sé que lo nuestro vale la pena.",
    "Juntos somos más fuertes.",
    "Nuestras almas no se sueltan tan fácil.",
    "Amar también es decidir.",
    "Nos faltan tantas aventuras por vivir.",
    "Tu sonrisa era de mis cosas favoritas.",
    "Fuiste mi inspiración.",
    "Cambiaste mi vida.",
    "No quiero soltarte.",
    "Ni la distancia pudo romper lo que había.",
    "Quiero que seas tú.",
    "No quiero amar a otra persona.",
    "Nadie me mira como tú lo hacías.",
    "Esto que construimos es más fuerte de lo que pensábamos.",
    "Nadie ama de la forma en que tú amas.",
    "Te elegí porque quise, no por costumbre.",
    "A tu lado entendí la belleza de lo simple.",
    "Lo nuestro merece tiempo, no abandono.",
    "Dimos mucho, incluso cuando estábamos rotos.",
    "Eres paz para mí.",
    "A tu lado todo parecía tener sentido.",
    "Aún te amo sin prisas y sin condiciones.",
    "Nadie me inspira como tú.",
    "Tus buenos días eran mi luz.",
    "Siento que todavía tengo tanto para darte.",
    "No te cambiaría por nadie.",
    "No todo lo que duele debe terminar.",
    "Nuestra historia aún tiene capítulos que escribir.",
    "He aprendido tanto contigo.",
    "Hay un fuego entre nosotros que no se apaga.",
    "Sigo admirándote.",
    "Quiero que vuelvas a ser mi refugio.",
    "Contigo la vida era música.",
    "Te elijo otra vez, con lo bueno y lo malo.",
    "Nuestro amor no debería terminar así.",
    "Me hiciste sentir en casa.",
    "Tus errores nunca fueron más grandes que tus virtudes.",
    "Nadie me conoce como tú.",
    "Volver contigo no es rendirse, es elegir lo real.",
    "Incluso en medio del caos, tú eras mi hogar.",
    "Sé que podemos hacerlo mejor.",
    "Lo nuestro es diferente, pero es leal.",
    "Sin ti, mi vida pierde sentido.",
    "Tus abrazos curaban más que el tiempo.",
    "El amor también necesita oportunidades.",
    "Todavía nos importamos.",
    "Seguimos latiendo al mismo ritmo.",
    "La vida sin ti se siente vacía.",
    "Somos humanos, no perfectos.",
    "Aún me haces sentir mariposas.",
    "Merecemos intentarlo sin miedo.",
    "Fuiste mi refugio muchas veces.",
    "No quiero que sea demasiado tarde.",
    "Nos debemos una historia bonita.",
    "Aún me tiemblan las manos cuando te pienso.",
    "Este amor todavía tiene raíces.",
    "Te sigo amando, sin importar nada.",
    "Cada canción me recuerda a ti.",
    "Sigo encontrando tu luz en mis días más oscuros.",
    "Me haces querer ser mejor persona.",
    "Tu forma de ver el mundo me inspira.",
    "Extraño hacer planes contigo.",
    "Tu risa aún retumba en mi mente.",
    "Contigo aprendí a perdonar.",
    "Tus mensajes eran mi refugio diario.",
    "Aún guardo cada detalle que te hacía feliz.",
    "Porque contigo el tiempo volaba.",
    "Nuestra historia merece un nuevo comienzo."
];

const reasonList = document.getElementById("reasonList");
const totalReasonsEl = document.getElementById("totalReasons");
const progressFill = document.getElementById("progressFill");
const progressNote = document.getElementById("progressNote");
const randomReasonBtn = document.getElementById("randomReasonBtn");
const randomReasonEl = document.getElementById("randomReason");
const timelineButtons = document.querySelectorAll(".timeline__step");
const timelineDateEl = document.getElementById("timelineDate");
const timelineTitleEl = document.getElementById("timelineTitle");
const timelineCopyEl = document.getElementById("timelineCopy");
const saveReasonBtn = document.getElementById("saveReasonBtn");
const savedReasonsList = document.getElementById("savedReasons");
const jarHint = document.getElementById("jarHint");
const heartsLayer = document.getElementById("heartsLayer");

let revealedCount = 0;
const savedReasonsSet = new Set();

if (totalReasonsEl) {
    totalReasonsEl.textContent = reasons.length.toString();
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        const target = entry.target;
        if (!target.dataset.revealed) {
            target.dataset.revealed = "true";
            revealedCount += 1;
            updateProgress();
        }
        target.classList.add("visible");
    });
}, {
    threshold: 0.4
});

function createCard(text, index) {
    const card = document.createElement("article");
    card.className = "reason-card";

    const number = document.createElement("p");
    number.className = "reason-card__number";
    number.textContent = `Razón ${index + 1}`;

    const copy = document.createElement("p");
    copy.className = "reason-card__text";
    copy.textContent = text;

    card.append(number, copy);
    observer.observe(card);
    return card;
}

function updateProgress() {
    const percent = Math.min(100, (revealedCount / reasons.length) * 100);
    progressFill.style.width = `${percent}%`;
    progressNote.textContent = `Has leído ${revealedCount} de ${reasons.length} razones.`;
}

function pickRandomReason() {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    const text = reasons[randomIndex];
    randomReasonEl.textContent = text;
    randomReasonEl.classList.add("pulse");
    setTimeout(() => randomReasonEl.classList.remove("pulse"), 800);
}

if (reasonList) {
    reasons.forEach((reason, idx) => {
        const card = createCard(reason, idx);
        reasonList.appendChild(card);
    });
}

if (randomReasonBtn) {
    randomReasonBtn.addEventListener("click", pickRandomReason);
}

const timelineData = [
    {
        date: "Cuando nos encontramos",
        title: "El día que el mundo cambió",
        copy: "Todo se acomodó cuando sonreíste. Sentí que la vida me estaba mostrando hacia dónde debía correr: hacia ti."
    },
    {
        date: "Kilómetros de distancia",
        title: "Lo que la distancia no quebró",
        copy: "Aprendimos a amar por llamadas, por silencios compartidos, por mensajes que guardé como tesoros. Nada apagó lo que sentimos."
    },
    {
        date: "Errores y aprendizajes",
        title: "Nos caímos, pero seguimos",
        copy: "Me equivoqué, pero también aprendí que cuidarte es una elección diaria. Quiero hacerlo mejor, con toda mi paciencia y amor."
    },
    {
        date: "Hoy",
        title: "Un nuevo intento lleno de calma",
        copy: "Estoy listo para volver a tomarte la mano, sanar lo herido y escribir el capítulo más honesto y valiente de nuestra historia."
    }
];

function updateTimeline(index) {
    if (!timelineButtons.length || !timelineDateEl || !timelineTitleEl || !timelineCopyEl) {
        return;
    }
    const data = timelineData[index];
    if (!data) {
        return;
    }
    timelineButtons.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.add("is-active");
            btn.setAttribute("aria-selected", "true");
        } else {
            btn.classList.remove("is-active");
            btn.setAttribute("aria-selected", "false");
        }
    });
    timelineDateEl.textContent = data.date;
    timelineTitleEl.textContent = data.title;
    timelineCopyEl.textContent = data.copy;
}

timelineButtons.forEach((button, index) => {
    button.addEventListener("click", () => updateTimeline(index));
});

function saveReason() {
    if (!savedReasonsList || !jarHint) {
        return;
    }
    let attempts = 0;
    let selection = reasons[Math.floor(Math.random() * reasons.length)];
    while (savedReasonsSet.has(selection) && attempts < 10) {
        selection = reasons[Math.floor(Math.random() * reasons.length)];
        attempts += 1;
    }
    savedReasonsSet.add(selection);
    const item = document.createElement("li");
    item.textContent = selection;
    savedReasonsList.prepend(item);
    while (savedReasonsList.children.length > 5) {
        savedReasonsList.removeChild(savedReasonsList.lastChild);
    }
    const count = savedReasonsSet.size;
    jarHint.textContent = `Guardaste ${count} recuerdo${count === 1 ? "" : "s"} en el frasco.`;
    releaseHearts();
}

function releaseHearts() {
    if (!heartsLayer) {
        return;
    }
    for (let i = 0; i < 3; i += 1) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.style.left = `${10 + Math.random() * 80}%`;
        heart.style.bottom = "-10px";
        heart.style.animationDelay = `${i * 0.15}s`;
        heartsLayer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

if (saveReasonBtn) {
    saveReasonBtn.addEventListener("click", saveReason);
}

updateTimeline(0);

updateProgress();
