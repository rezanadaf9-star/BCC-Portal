/* =========================================================
   SUPER 15 MATERIAL
   ========================================================= */

const materialGrid = document.getElementById("materialGrid");

async function loadMaterials() {
    if (super15MaterialConfig.useBackend && super15MaterialConfig.backendEndpoint) {
        const response = await fetch(super15MaterialConfig.backendEndpoint);
        if (!response.ok) throw new Error("Unable to load materials.");
        const data = await response.json();
        return data.materials || data.data || data || [];
    }
    return super15MaterialConfig.materials || [];
}

function iconFor(type) {
    const value = String(type || "").toUpperCase();
    if (value === "PDF") return "fa-file-pdf";
    if (value === "JPG" || value === "JPEG" || value === "PNG" || value === "IMAGE") return "fa-file-image";
    if (value === "LECTURE" || value === "VIDEO") return "fa-circle-play";
    return "fa-file-lines";
}

function renderMaterials(materials) {
    if (!materials.length) {
        materialGrid.innerHTML = `
            <div class="empty-material">
                <i class="fa-solid fa-folder-open"></i>
                <h3>No Material Added</h3>
                <p>PDFs, JPGs, PYQs, practice questions and lecture links will appear here when uploaded.</p>
            </div>
        `;
        return;
    }

    materialGrid.innerHTML = materials.map(item => `
        <article class="material-card">
            <div class="material-card-icon"><i class="fa-solid ${iconFor(item.type)}"></i></div>
            <div class="material-card-body">
                <span>${item.type || "MATERIAL"}</span>
                <h3>${item.title || "Untitled Material"}</h3>
                <p>${item.description || "Material shared for Super 15 students."}</p>
                <a href="${item.url || "#"}" target="_blank" rel="noopener" class="material-open">
                    Open Material <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </article>
    `).join("");
}

(async function init() {
    try {
        renderMaterials(await loadMaterials());
    } catch (error) {
        console.error(error);
        renderMaterials([]);
    }
})();
