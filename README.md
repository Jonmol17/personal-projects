# Väder & bild Mashup

Ett pågående mashup‑projekt som kombinerar WeatherAPI.com och Unsplash för att visa väderdata tillsammans med relevanta bilder. Projektet är byggt som en fullstack‑applikation med realtidsfunktioner, autentisering och container baserad drift.

# Funktioner
- Sök väderdata för valfri plats
- Favorisera orter/städer
- Visa relevanta bilder från Unsplash baserat på väder eller sökord
- Realtidsuppdateringar via SignalR
- Enkel JWT autentisering (lagring i localStorage)

# Teknikstack
Backend: ASP.NET Core Web API - SignalR, JWT
Frontend: React + Next.js
Databas: MongoDB (Docker image)
Drift: Docker Compose
Externa APIer: Unsplash, WeatherAPI.com

# Externa APIer & Begränsningar
Projektet använder gratisnivåerna av Unsplash och WeatherAPI, vilket innebär att batch anrop inte stöds och rate limiting. 
Detta leder till att vissa operationer kräver flera separata API anrop. Detta är en känd begränsning och hanteras i nuläget med enklare lösningar som kan förbättras framöver.

# Miljövariabler
Alla miljövariabler finns dokumenterade i .env.example.
Dessa injiceras automatiskt till respektive tjänst via docker-compose.yml.

# Installation & Körning
1. Klona projektet
2. Skapa .env baserat på .env.example (Fyll i API nycklar, URL:er och secrets.)
3. Starta med Docker Compose (docker-compose up --build)

# Autentisering
Projektet använder JWT för autentisering.

- Token lagras i localStorage (tillfällig lösning)
- Ingen refresh token‑hantering ännu
- HTTPS saknas i nuläget

Planer finns på att refaktorera om till cookies (HttpOnly) och implementera Caddy som reverse proxy + HTTPS

# Kända Begränsningar & TODO
Detta är ett pågående projekt. Följande delar är planerade eller under utveckling:
Backend
- Förbättrad felhantering i service lageret
- Historisk väderdata
- Framtida prediktioner
- Vänlista och se vänners väderdata

Frontend
- Bättre UI/UX
- Realtidsvisning av vänners väderdata

