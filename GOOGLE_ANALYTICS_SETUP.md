# 🎯 Google Analytics 4 Setup Guide
*Real Visitor Tracking for Broken Institutions*

## ⚠️ IMPORTANT: No More Fake Numbers!

Il vecchio sistema di contatore visitatori è stato sostituito con Google Analytics 4 per garantire **MASSIMA TRASPARENZA** e dati reali - perfetto per un sito di giornalismo investigativo.

## 🚀 Setup Steps (5 minuti)

### 1. Crea Account Google Analytics
- Vai su: **https://analytics.google.com**
- Accedi con il tuo account Google
- Clicca "Inizia gratuitamente"

### 2. Configura la Proprietà
- **Nome account:** "Broken Institutions"
- **Nome proprietà:** "Broken Institutions Website"
- **URL del sito:** `https://brokeninstitutions.github.io/sources`
- **Settore:** "Notizie e media"
- **Fuso orario:** Seleziona il tuo fuso orario

### 3. Ottieni il Measurement ID
- Dopo la creazione, Google Analytics ti mostrerà il **Measurement ID**
- Formato: `G-XXXXXXXXXX` (esempio: `G-ABC123DEF456`)
- **Copialo!** Ti serve per il passo successivo

### 4. Configura il Codice
- Apri il file: `google-analytics.js`
- Trova la riga: `const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID';`
- Sostituisci `GA_MEASUREMENT_ID` con il tuo vero ID:
```javascript
// Prima (da cambiare):
const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID';

// Dopo (con il tuo vero ID):
const GA_MEASUREMENT_ID = 'G-ABC123DEF456';
```

### 5. Deploy e Test
- Commit e push delle modifiche
- Visita il sito: il contatore mostrerà "Tracking Real Visitors" in verde
- Controlla la console del browser: dovrai vedere "✅ Google Analytics 4 loaded"

## 🎯 Cosa Otterrai

### Dashboard Google Analytics:
- **Visitatori reali** in tempo reale
- **Pagine più visitate**
- **Provenienza geografica** dei lettori
- **Dispositivi utilizzati** (mobile/desktop)
- **Durata delle sessioni**

### Sul Sito:
- Contatore che mostra lo stato del tracking reale
- Nessun più numero inventato o stimato
- Completa trasparenza per i lettori

## 🔒 Privacy & GDPR
Google Analytics 4 è conforme al GDPR e non traccia informazioni personali identificabili. Perfetto per giornalismo etico.

## 🛠 Supporto Tecnico

**Se hai problemi:**
1. Verifica che il Measurement ID sia corretto
2. Controlla la console del browser per errori
3. Assicurati che il file `google-analytics.js` sia caricato correttamente

**Codice attuale mostra:**
- 🟡 "Setup Required" = Measurement ID da configurare
- 🟢 "Tracking Real Visitors" = Tutto funziona!

---

*Implementazione completata per massima integrità giornalistica - solo dati reali, mai numeri falsi!*