const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  // Disabilita la barra dei menu
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true, // Mostra la barra con i pulsanti di chiusura e riduzione a icona
    minimizable: true, // Permette la minimizzazione
    maximizable: false, // Disabilita il pulsante di ingrandimento
    resizable: false, // Impedisce il ridimensionamento della finestra
    icon: 'icon.png', // Aggiungi l'icona personalizzata
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Carica il file HTML principale
  win.loadFile('index.html');

  // Imposta lo zoom out al 75% (puoi modificare il valore come preferisci)
  win.webContents.on('did-finish-load', () => {
    win.webContents.setZoomFactor(0.75);
  });
}

// Crea la finestra quando l'app è pronta
app.whenReady().then(createWindow);

// Chiudi l'app quando tutte le finestre sono chiuse, tranne su macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Ricrea la finestra se l'icona del dock viene cliccata e non ci sono finestre aperte (su macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

