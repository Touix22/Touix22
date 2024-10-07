let container, image, currentX = 0, currentY = 0, isDragging = false, startX, startY, scale = 1, currentButton;
let clickX, clickY, isAdminMode = false;

// Variables globales pour les waypoints
let waypoints = [];
let tags = [];

// Charger les waypoints depuis un fichier JSON
function loadWaypoints() {
    fetch('waypoints.json') // Remplacer par le chemin de votre fichier JSON local
        .then(response => response.json())
        .then(data => {
            waypoints = data;
            renderWaypoints(); // Affiche les waypoints sur la carte
        })
        .catch(error => console.error('Erreur de chargement des waypoints :', error));
}

// Sauvegarder les waypoints dans le fichier JSON
function saveWaypointsToFile() {
    const dataStr = JSON.stringify(waypoints, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'waypoints.json';
    
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Fonction pour afficher les waypoints sur la carte
function renderWaypoints() {
    const container = document.getElementById('container');
    waypoints.forEach(waypoint => {
        const wpElement = document.createElement('img');
        wpElement.src = waypoint.icon;
        wpElement.alt = waypoint.title;
        wpElement.title = `${waypoint.title}: ${waypoint.description}`;
        wpElement.style.position = 'absolute';
        wpElement.style.left = waypoint.x + 'px';
        wpElement.style.top = waypoint.y + 'px';
        wpElement.style.transform = `scale(${scale})`; // S'adapte au zoom
        container.appendChild(wpElement);
    });
}

// Charger les icônes disponibles (à partir d'un dossier, par exemple)
function loadIcons() {
    const icons = ['images/icon1.png', 'images/icon2.png']; // Ajoutez ici vos chemins d'icônes
    const iconSelect = document.getElementById('icon');
    iconSelect.innerHTML = ''; // Clear the existing options if any
    icons.forEach(icon => {
        const option = document.createElement('option');
        option.value = icon;
        option.text = icon.split('/').pop();
        iconSelect.appendChild(option);
    });
}

// Charger les tags disponibles
function loadTags() {
    const tagSelect = document.getElementById('tag');
    tagSelect.innerHTML = ''; // Réinitialise les options
    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.text = tag;
        tagSelect.appendChild(option);
    });
}

// Ajouter un tag
function addTag(newTag) {
    if (newTag && !tags.includes(newTag)) {
        tags.push(newTag);
        loadTags(); // Recharger les tags dans le menu déroulant
    }
}

// Supprimer un tag
function deleteTag(tagToDelete) {
    if (tagToDelete) {
        tags = tags.filter(tag => tag !== tagToDelete);
        loadTags(); // Recharger les tags dans le menu déroulant
    }
}

// Export des fonctions si nécessaire (pour Node.js ou autres frameworks)
// module.exports = {
//     loadWaypoints,
//     saveWaypointsToFile,
//     renderWaypoints,
//     loadIcons,
//     loadTags,
//     addTag,
//     deleteTag
// };
