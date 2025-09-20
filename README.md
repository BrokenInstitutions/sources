# Broken Institutions - Investigative Journalism

🌐 **Live Site:** https://riccardobertolini.github.io/broken-institutions/

# Broken Institutions - Refactored Structure

## 🎯 Problemi Risolti

### Prima del Refactoring
- **886 righe di CSS** in un singolo file HTML
- **JavaScript inline** sparso nel documento
- **Duplicazione light/dark theme** invece di CSS custom properties
- **CSS non riutilizzabile** con selettori troppo specifici
- **Manutenibilità scarsa** - tutto in un file monolitico

### Dopo il Refactoring
- **CSS modulare** diviso in 5 file logici
- **JavaScript separato** in moduli specializzati
- **Sistema di temi** con CSS custom properties
- **Build system** per ottimizzazione automatica
- **HTML semantico** pulito e accessibile

## 📁 Nuova Struttura

```
sources/
├── css/
│   ├── base.css          # Reset, tipografia, animazioni
│   ├── theme.css         # Variabili tema e toggle
│   ├── layout.css        # Header, footer, struttura
│   ├── components.css    # Tab, cards, form, grids
│   └── mobile.css        # Media queries responsive
├── js/
│   ├── theme-toggle.js   # Gestione tema
│   ├── tabs.js          # Sistema tab
│   ├── filters.js       # Filtri ricerca
│   └── app.js           # Orchestrazione moduli
├── dist/                 # Build output (generato)
├── build.js             # Sistema build
├── package.json         # Configurazione progetto
├── index-new.html       # HTML pulito
└── index.html           # File originale (backup)
```

## 🛠 Sistema di Build

### Comandi Disponibili

```bash
# Build produzione (minificato)
node build.js

# Build sviluppo (non minificato)
node build.js --dev

# Watch mode (ricompila automaticamente)
node build.js --watch
```

### Cosa Fa il Build

1. **Concatena CSS** nell'ordine corretto: theme → base → layout → components → mobile
2. **Concatena JavaScript** mantenendo le dipendenze: theme → tabs → filters → app
3. **Minifica** i file in produzione (rimuove commenti, whitespace)
4. **Aggiorna HTML** per usare file concatenati
5. **Copia assets** (directory cases) nella cartella dist/

## 🎨 Sistema di Temi Migliorato

### CSS Custom Properties
```css
:root {
    --bg-color: #121212;
    --text-color: #e9ecef;
    --link-color: #1e40af;
    /* ... altre variabili */
}

html[data-theme="light"] {
    --bg-color: #f8f9fa;
    --text-color: #2c3e50;
    /* ... override per tema chiaro */
}
```

### Vantaggi
- **No duplicazione** di codice per temi diversi
- **Facile aggiunta** di nuovi temi
- **Manutenzione semplificata**
- **Migliori performance**

## 📱 Responsive Design

### Mobile-First Approach
- Layout responsive con grid CSS
- Ottimizzazioni specifiche per mobile
- Touch-friendly interface
- Font sizing per iOS (previene zoom)

## ♿ Accessibilità

### Miglioramenti Implementati
- **ARIA labels** per controlli
- **Semantic HTML** (header, main, section, nav)
- **Role attributes** per tab system
- **Focus management** per keyboard navigation
- **Screen reader** friendly

## 🚀 Performance

### Ottimizzazioni
- **CSS consolidato**: da 5 richieste HTTP a 1
- **JS consolidato**: da 4 file a 1
- **Minificazione**: riduzione dimensioni file
- **CSS variables**: rendering più efficiente
- **Eliminazione duplicati**: codice più pulito

## 📊 Confronto Dimensioni

| Componente | Prima | Dopo | Riduzione |
|------------|-------|------|-----------|
| HTML | 886 righe CSS inline | HTML pulito | ~70% |
| CSS | Tutto inline | 5 moduli | Riutilizzabile |
| JS | Inline e sparso | 4 moduli | Modulare |
| HTTP Requests | 2 (HTML + shared-toggle) | 3 (HTML + CSS + JS) | Cacheable |

## 🔧 Utilizzo

### Sviluppo
1. Modifica i file in `css/` e `js/`
2. Usa `node build.js --watch` per sviluppo
3. Testa in `dist/index.html`

### Produzione
1. Esegui `node build.js` per build finale
2. Distribuisci il contenuto di `dist/`

### Aggiungere Nuovi Componenti
1. Crea CSS in `css/components.css`
2. Aggiungi JS in modulo appropriato
3. Aggiorna build.js se necessario

## 🎁 Benefici del Refactoring

### Sviluppatore
- **Manutenibilità**: codice organizzato e modulare
- **Scalabilità**: facile aggiungere nuove funzionalità
- **Debug**: errori isolati per modulo
- **Collaborazione**: file separati, meno conflitti

### Performance
- **Caching**: file CSS/JS cacheable separatamente
- **Minificazione**: file più leggeri
- **Modularity**: carica solo quello che serve

### SEO & Accessibilità
- **HTML semantico**: migliore per SEO
- **Accessibility**: ARIA labels e structure
- **Mobile-friendly**: responsive design

## 🔄 Migrazione

Per sostituire il file originale:
```bash
# Backup del file originale
mv index.html index-original.html

# Usa la nuova versione
mv index-new.html index.html

# Build finale
node build.js
```