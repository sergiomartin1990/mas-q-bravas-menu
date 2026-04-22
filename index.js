    const sections = {
      huevos: 'sec-huevos',
      papas: 'sec-papas',
      croquetas: 'sec-croquetas',
      alas: 'sec-alas',
      panes: 'sec-panes',
      huerta: 'sec-huerta',
      racion: 'sec-racion',
      postres: 'sec-postres'
    };

    function filter(cat, btn) {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      Object.values(sections).forEach(id => document.getElementById(id).classList.add('hidden'));
      if (cat === 'todos') {
        Object.values(sections).forEach(id => document.getElementById(id).classList.remove('hidden'));
      } else {
        document.getElementById(sections[cat]).classList.remove('hidden');
      }
    }

    // Función principal para cargar el menú
async function loadMenu() {
    try {
        // FORMA CORRECTA (Ruta relativa)
        const response = await fetch('./menu.json');
        const data = await response.json();
        renderMenu(data.categorias);
    } catch (error) {
        console.error("Error cargando el menú:", error);
    }
}

// Función para dibujar el menú en el HTML
function renderMenu(categorias) {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; // Limpiar contenedor

    categorias.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'section';
        section.id = `sec-${cat.id}`;

        let itemsHtml = cat.items.map(item => `
            <div class="item">
                <div class="item-body">
                    <div class="item-name">
                        ${item.nombre} 
                        ${item.nota ? `<span class="item-note">(${item.nota})</span>` : ''}
                    </div>
                    ${item.descripcion ? `<div class="item-desc">${item.descripcion}</div>` : ''}
                </div>
                <div class="item-price">${item.price || item.precio}</div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="sec-head">
                <div class="sec-line"></div>
                <div class="sec-title">${cat.titulo}</div>
                <div class="sec-line"></div>
            </div>
            ${itemsHtml}
        `;
        
        container.appendChild(section);
    });
}

// Función de filtrado
function filterMenu(id, btn) {
    // Quitar clase active de todos los botones
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    // Poner active al botón clicado
    btn.classList.add('active');

    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => {
        if (id === 'todos' || sec.id === `sec-${id}`) {
            sec.classList.remove('hidden');
        } else {
            sec.classList.add('hidden');
        }
    });
}

// Iniciar carga
loadMenu();
