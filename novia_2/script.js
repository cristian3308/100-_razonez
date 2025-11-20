'use strict';

// Navegación seccional ------------------------------------------------------
const navButtons = document.querySelectorAll('.nav-links button');
const panels = document.querySelectorAll('.panel');

navButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.dataset.target;
        navButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.id === target));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Datos base ---------------------------------------------------------------
const aniversario = new Date('2022-07-20T00:00:00');
const contadorDias = document.getElementById('contador-dias');
const horasJuntos = document.getElementById('contador-horas');
const frasesRomanticas = [
    'Eres mi casualidad favorita del universo ✨',
    'Tus abrazos son mi lugar seguro ❤️',
    'Te amo más que a las estrellas que cuentan nuestra historia 🌌',
    'Siempre elegiría tu sonrisa en cualquier vida 💫'
];

const frasesGuardadasKey = 'amor_frases_guardadas_v1';
const fotosGuardadasKey = 'amor_fotos_guardadas_v1';
const metasKey = 'amor_metas_v1';
const chatAsistenteKey = 'amor_chat_asistente_v1';
const chatPrivadoKey = 'amor_chat_privado_v1';

const fraseActual = document.getElementById('frase-actual');
const btnFrase = document.getElementById('btn-frase');

function actualizarContador() {
    const ahora = new Date();
    const diff = ahora - aniversario;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diff / (1000 * 60 * 60));
    contadorDias.textContent = `${dias.toLocaleString()} días juntos ❤️`;
    horasJuntos.textContent = `${horas.toLocaleString()} horas de historias compartidas`;
}

actualizarContador();
setInterval(actualizarContador, 1000 * 60 * 60);

btnFrase.addEventListener('click', () => {
    const random = Math.floor(Math.random() * frasesRomanticas.length);
    fraseActual.textContent = frasesRomanticas[random];
});

function cargarDesdeLocalStorage(key, fallback) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : fallback;
    } catch (error) {
        console.warn('No se pudo leer localStorage', error);
        return fallback;
    }
}

function guardarEnLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function normalizarHistorial(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    return data
        .filter((mensaje) => mensaje && typeof mensaje === 'object')
        .map((mensaje) => ({
            texto: typeof mensaje.texto === 'string' ? mensaje.texto : '',
            tipo: ['tu', 'ella', 'bot'].includes(mensaje.tipo) ? mensaje.tipo : 'bot',
            html: Boolean(mensaje.html),
            timestamp: typeof mensaje.timestamp === 'string' ? mensaje.timestamp : ''
        }))
        .filter((mensaje) => mensaje.texto);
}

const mensajesGuardados = cargarDesdeLocalStorage(frasesGuardadasKey, []);
const fotosGuardadas = cargarDesdeLocalStorage(fotosGuardadasKey, [
    'https://images.pexels.com/photos/3693892/pexels-photo-3693892.jpeg',
    'https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg',
    'https://images.pexels.com/photos/2968783/pexels-photo-2968783.jpeg'
]);
const metasGuardadas = cargarDesdeLocalStorage(metasKey, []);
const historialAsistente = normalizarHistorial(cargarDesdeLocalStorage(chatAsistenteKey, []));
const historialPrivado = normalizarHistorial(cargarDesdeLocalStorage(chatPrivadoKey, []));

// Portal del amor ----------------------------------------------------------
const formularioMensaje = document.getElementById('form-mensaje');
const listadoMensajes = document.getElementById('lista-mensajes');
const formularioFoto = document.getElementById('form-foto');
const galeria = document.getElementById('galeria');
const formularioMeta = document.getElementById('form-meta');
const metasList = document.getElementById('lista-metas');

function renderMensajes() {
    listadoMensajes.innerHTML = '';
    if (!mensajesGuardados.length) {
        const vacio = document.createElement('p');
        vacio.textContent = 'Todavía no guardaste mensajes, crea uno para sorprenderla ✍️';
        listadoMensajes.appendChild(vacio);
        return;
    }

    mensajesGuardados.forEach((mensaje, index) => {
        const card = document.createElement('article');
        card.className = 'message-card';
        card.innerHTML = `
            <p>${mensaje.texto}</p>
            <small>${mensaje.fecha}</small>
        `;
        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Eliminar';
        btnBorrar.addEventListener('click', () => {
            mensajesGuardados.splice(index, 1);
            guardarEnLocalStorage(frasesGuardadasKey, mensajesGuardados);
            renderMensajes();
        });
        card.appendChild(btnBorrar);
        listadoMensajes.appendChild(card);
    });
}

function renderGaleria() {
    galeria.innerHTML = '';
    fotosGuardadas.forEach((url, index) => {
        const figura = document.createElement('figure');
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Recuerdo romántico';
        figura.appendChild(img);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✕';
        removeBtn.className = 'remove-btn';
        removeBtn.addEventListener('click', () => {
            fotosGuardadas.splice(index, 1);
            guardarEnLocalStorage(fotosGuardadasKey, fotosGuardadas);
            renderGaleria();
        });

        figura.appendChild(removeBtn);
        galeria.appendChild(figura);
    });
}

function renderMetas() {
    metasList.innerHTML = '';
    if (!metasGuardadas.length) {
        const vacio = document.createElement('p');
        vacio.textContent = 'Planeen su próxima aventura y guárdenla aquí ✈️';
        metasList.appendChild(vacio);
        return;
    }

    metasGuardadas.forEach((meta, index) => {
        const card = document.createElement('article');
        card.className = 'message-card';
        card.innerHTML = `
            <p>${meta.texto}</p>
            <small>${meta.fecha}</small>
        `;
        const doneBtn = document.createElement('button');
        doneBtn.textContent = '✔️';
        doneBtn.addEventListener('click', () => {
            metasGuardadas.splice(index, 1);
            guardarEnLocalStorage(metasKey, metasGuardadas);
            renderMetas();
        });
        card.appendChild(doneBtn);
        metasList.appendChild(card);
    });
}

renderMensajes();
renderGaleria();
renderMetas();

formularioMensaje.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = event.target.elements['mensaje-personal'].value.trim();
    if (!texto) {
        return;
    }

    mensajesGuardados.unshift({
        texto,
        fecha: new Date().toLocaleString()
    });
    guardarEnLocalStorage(frasesGuardadasKey, mensajesGuardados);
    renderMensajes();
    event.target.reset();
});

formularioFoto.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = event.target.elements['url-foto'].value.trim();
    if (!url) {
        return;
    }
    fotosGuardadas.unshift(url);
    guardarEnLocalStorage(fotosGuardadasKey, fotosGuardadas);
    renderGaleria();
    event.target.reset();
});

formularioMeta.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = event.target.elements['meta'].value.trim();
    if (!texto) {
        return;
    }
    metasGuardadas.unshift({
        texto,
        fecha: new Date().toLocaleDateString()
    });
    guardarEnLocalStorage(metasKey, metasGuardadas);
    renderMetas();
    event.target.reset();
});

// Chat asistente -----------------------------------------------------------
const ventanaAsistente = document.getElementById('chat-asistente');
const formularioAsistente = document.getElementById('form-chat');
const inputAsistente = document.getElementById('mensaje');
const selectEmisor = document.getElementById('emisor');
const quickReplyButtons = document.querySelectorAll('#card-asistente [data-quick]');
const btnLimpiarAsistente = document.getElementById('btn-limpiar-chat');

function crearBurbuja(contenedor, { texto, tipo, html, timestamp }) {
    const bubble = document.createElement('div');
    bubble.className = `bubble ${tipo}`;
    if (html) {
        bubble.innerHTML = texto;
    } else {
        bubble.textContent = texto;
    }
    if (timestamp) {
        const time = document.createElement('small');
        time.textContent = timestamp;
        bubble.appendChild(time);
    }
    contenedor.appendChild(bubble);
    contenedor.scrollTop = contenedor.scrollHeight;
}

function renderConversacion(contenedor, historial) {
    contenedor.innerHTML = '';
    historial.forEach((mensaje) => crearBurbuja(contenedor, mensaje));
}

function pushMensaje(historial, storageKey, contenedor, mensaje) {
    historial.push(mensaje);
    guardarEnLocalStorage(storageKey, historial);
    crearBurbuja(contenedor, mensaje);
}

renderConversacion(ventanaAsistente, historialAsistente);

const respuestasBot = {
    hola: 'Hola mi amor 💕 ¿cómo va tu día?',
    'te amo': 'Yo te amo más, infinito por dos 😍',
    extraño: 'También te extraño, cada minuto cuenta 🥺',
    gracias: 'Siempre, siempre estaré para ti 🌷',
    cansada: 'Respira, descansa conmigo mentalmente un segundo 💆‍♀️',
    triste: 'Te abrazo fuerte desde aquí, no estás sola 💞'
};

function obtenerAleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

function procesarRespuestaAutomatica(texto, autor) {
    if (autor !== 'tu') {
        return;
    }

    const normalized = texto.toLowerCase();
    const respuestas = [];

    Object.entries(respuestasBot).forEach(([clave, respuesta]) => {
        if (normalized.includes(clave)) {
            respuestas.push({ texto: respuesta, tipo: 'bot' });
        }
    });

    if (normalized.includes('frase')) {
        respuestas.push({ texto: obtenerAleatorio(frasesRomanticas), tipo: 'bot' });
    }

    if (normalized.includes('recuerdo') && fotosGuardadas.length) {
        const foto = obtenerAleatorio(fotosGuardadas);
        respuestas.push({
            texto: `💌 Mira este recuerdo especial: <a href="${foto}" target="_blank" rel="noopener">Abrir foto</a>`,
            tipo: 'bot',
            html: true
        });
    }

    if (normalized.includes('plan') && metasGuardadas.length) {
        const meta = obtenerAleatorio(metasGuardadas);
        respuestas.push({
            texto: `📅 ¡Anotado! Hagamos realidad: <strong>${meta.texto}</strong>`,
            tipo: 'bot',
            html: true
        });
    }

    if (normalized.includes('sorpresa')) {
        respuestas.push({ texto: '🎁 Tengo un detalle preparándose... espera a medianoche para descubrirlo ✨', tipo: 'bot' });
    }

    if (!respuestas.length) {
        respuestas.push({ texto: 'Siempre estoy aquí para seguir la conversación y amarte un poquito más ❤️', tipo: 'bot' });
    }

    respuestas.forEach((mensaje, index) => {
        setTimeout(() => {
            pushMensaje(historialAsistente, chatAsistenteKey, ventanaAsistente, {
                ...mensaje,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }, 450 + index * 350);
    });
}

formularioAsistente.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = inputAsistente.value.trim();
    if (!texto) {
        return;
    }

    const tipo = selectEmisor.value === 'ella' ? 'ella' : 'tu';
    const mensaje = {
        texto,
        tipo,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    pushMensaje(historialAsistente, chatAsistenteKey, ventanaAsistente, mensaje);
    inputAsistente.value = '';
    procesarRespuestaAutomatica(texto, tipo);
});

quickReplyButtons.forEach((button) => {
    button.addEventListener('click', () => {
        inputAsistente.value = button.dataset.quick;
        inputAsistente.focus();
    });
});

btnLimpiarAsistente.addEventListener('click', () => {
    if (!historialAsistente.length) {
        return;
    }
    if (!window.confirm('¿Deseas borrar la conversación con el asistente?')) {
        return;
    }
    historialAsistente.length = 0;
    guardarEnLocalStorage(chatAsistenteKey, historialAsistente);
    renderConversacion(ventanaAsistente, historialAsistente);
});

// Chat privado -------------------------------------------------------------
const ventanaPrivada = document.getElementById('chat-privado');
const formularioPrivado = document.getElementById('form-chat-privado');
const inputPrivado = document.getElementById('mensaje-privado');
const selectPrivado = document.getElementById('emisor-privado');
const btnLimpiarPrivado = document.getElementById('btn-limpiar-privado');

renderConversacion(ventanaPrivada, historialPrivado);

formularioPrivado.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = inputPrivado.value.trim();
    if (!texto) {
        return;
    }
    const tipo = selectPrivado.value === 'ella' ? 'ella' : 'tu';
    const mensaje = {
        texto,
        tipo,
        timestamp: new Date().toLocaleString()
    };
    pushMensaje(historialPrivado, chatPrivadoKey, ventanaPrivada, mensaje);
    inputPrivado.value = '';
});

btnLimpiarPrivado.addEventListener('click', () => {
    if (!historialPrivado.length) {
        return;
    }
    if (!window.confirm('¿Borrar el chat privado guardado en este dispositivo?')) {
        return;
    }
    historialPrivado.length = 0;
    guardarEnLocalStorage(chatPrivadoKey, historialPrivado);
    renderConversacion(ventanaPrivada, historialPrivado);
});

// Corazones animados ------------------------------------------------------
const corazonCanvas = document.getElementById('heartCanvas');
const ctx = corazonCanvas.getContext('2d');
const hearts = [];

function ajustarCanvas() {
    corazonCanvas.width = corazonCanvas.clientWidth;
    corazonCanvas.height = corazonCanvas.clientHeight;
}

window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

function crearCorazon() {
    const size = 26 + Math.random() * 18;
    return {
        x: Math.random() * corazonCanvas.width,
        y: Math.random() * corazonCanvas.height,
        size,
        vel: 0.5 + Math.random() * 1.6,
        osc: Math.random() * Math.PI * 2
    };
}

for (let i = 0; i < 40; i += 1) {
    hearts.push(crearCorazon());
}

function animarCorazones() {
    ctx.clearRect(0, 0, corazonCanvas.width, corazonCanvas.height);
    ctx.font = '28px "Segoe UI Emoji"';

    hearts.forEach((heart) => {
        const wiggle = Math.sin(Date.now() / 1000 + heart.osc) * 10;
        ctx.fillText('❤️', heart.x + wiggle, heart.y);
        heart.y -= heart.vel;
        if (heart.y < -40) {
            Object.assign(heart, crearCorazon(), { y: corazonCanvas.height + 40 });
        }
    });

    requestAnimationFrame(animarCorazones);
}

animarCorazones();

// Utilidades --------------------------------------------------------------
const btnScrollTop = document.getElementById('btn-scroll-top');

btnScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const firebaseSection = document.getElementById('firebase-status');

async function inicializarFirebase() {
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js');
        const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js');

        const firebaseConfig = {
            apiKey: 'AIzaSyAsCiEscRQ4gvnS-i80YEpcX-6C0ZjPPf4',
            authDomain: 'pagina-4364a.firebaseapp.com',
            projectId: 'pagina-4364a',
            storageBucket: 'pagina-4364a.firebasestorage.app',
            messagingSenderId: '45167457557',
            appId: '1:45167457557:web:13ee888fa67b8c1473251c',
            measurementId: 'G-1VDG2SNWG1'
        };

        const app = initializeApp(firebaseConfig);
        getAnalytics(app);
        firebaseSection.textContent = 'Firebase listo para guardar recuerdos en la nube cuando quieras ☁️';
    } catch (error) {
        firebaseSection.textContent = 'Firebase opcional. No se inicializó en este entorno.';
        console.warn('No fue posible iniciar Firebase', error);
    }
}

inicializarFirebase();
