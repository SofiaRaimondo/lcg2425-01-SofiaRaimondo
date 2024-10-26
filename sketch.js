// L'opera è di Francesco Sobrino, risale al 1959, olio e tempera. link di riferimento: https://franciscosobrino.com/EN/biographie.html (fig. 2)

let diameter = 50; // Imposta un diametro fisso per i cerchi. Questo valore determina quanto sono grandi i cerchi che verranno disegnati.
let padding = 20; // Imposta il padding.
let angles = []; // Inizializza un array vuoto che verrà utilizzato per memorizzare angoli casuali per ciascun cerchio.

function setup() {
  createCanvas(windowWidth, windowHeight); // Crea un canvas che si adatta alla larghezza e all'altezza della finestra del browser.
  initializeAngles(); // Chiama la funzione per inizializzare gli angoli casuali per ogni cerchio.
}

function draw() {
  background(0); // Imposta il colore di sfondo del canvas nero.

  // Calcola il numero di colonne e righe di cerchi che possono essere disegnati sul canvas,
  // sottraendo il padding dal totale della larghezza e dell'altezza e dividendo per il diametro dei cerchi.
  let cols = floor((width - padding * 2) / diameter); // floor() arrotonda per difetto al numero intero più vicino.
  let rows = floor((height - padding * 2) / diameter); // Il numero di righe è calcolato allo stesso modo.

  // Se l'array angles non ha le stesse dimensioni, chiama initializeAngles() per rinizializzarlo.
  if (angles.length !== cols || angles[0].length !== rows) {
    initializeAngles(); // Rinizializza gli angoli se le dimensioni non corrispondono a quelle previste.
  }

  // Ciclo per disegnare i cerchi, ripetendo su ogni colonna e riga.
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // Calcola le coordinate x e y per il posizionamento dei cerchi,
      // tenendo conto del padding e posizionando i cerchi al centro.
      let x = i * diameter + padding + diameter / 2; // La posizione x è calcolata in base all'indice della colonna.
      let y = j * diameter + padding + diameter / 2; // La posizione y è calcolata in base all'indice della riga.
      drawHalfCircle(x, y, diameter, angles[i][j]); // Disegna un cerchio con le coordinate calcolate e l'angolo associato.
    }
  }
}

// Funzione per disegnare un cerchio e una linea diagonale al suo interno
function drawHalfCircle(x, y, d, angle) {
  fill(255); // Imposta il bianco come colore di riempimento del cerchio.
  strokeWeight(4.3); // Imposta il peso della linea per il contorno del cerchio.
  ellipse(x, y, d); // Disegna un cerchio centrato nelle coordinate (x, y) con diametro d.
  
  stroke(0); // Imposta il colore del contorno a nero.
  
  // Calcola le posizioni dei punti finali della linea diagonale.
  let x1 = x + cos(angle) * d / 2; // La posizione x1 è calcolata utilizzando il coseno dell'angolo.
  let y1 = y + sin(angle) * d / 2; // La posizione y1 è calcolata utilizzando il seno dell'angolo.
  let x2 = x + cos(angle + PI) * d / 2; // La posizione x2 è calcolata utilizzando l'angolo opposto.
  let y2 = y + sin(angle + PI) * d / 2; // La posizione y2 è calcolata utilizzando l'angolo opposto.
  
  strokeWeight(5); // Imposta un peso maggio per la linea diagonale.
  line(x1, y1, x2, y2); // Disegna la linea diagonale tra i punti (x1, y1) e (x2, y2).
}

// Funzione per inizializzare gli angoli casuali per ogni cerchio.
function initializeAngles() {
  angles = []; // Inizializza l'array degli angoli come un array vuoto.
  
  // Ricalcola il numero di colonne e righe in base alle dimensioni attuali del canvas.
  let cols = floor((width - padding * 2) / diameter); // Calcola il numero di colonne.
  let rows = floor((height - padding * 2) / diameter); // Calcola il numero di righe.

  // Ciclo per riempire l'array angles con angoli casuali.
  for (let i = 0; i < cols; i++) {
    angles[i] = []; // Inizializza un nuovo array per ogni colonna.
    for (let j = 0; j < rows; j++) {
      angles[i][j] = random(TWO_PI); // Genera un angolo casuale tra 0 e 2π e lo assegna all'angolo del cerchio (i, j).
    }
  }
}

// Funzione chiamata quando si fa clic con il mouse.
function mousePressed() {
  initializeAngles(); // Rigenera angoli random per i cerchi al click.
  redraw(); // Ridisegna il canvas per mostrare i nuovi angoli.
}

// Funzione chiamata quando la finestra viene ridimensionata.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridesigna il canvas per adattarlo alla nuova dimensione della finestra.
  initializeAngles(); // Rigenera gli angoli casuali dopo il ridimensionamento.
  redraw(); // Ridisegna il canvas per riflettere le nuove dimensioni e angoli.
}

