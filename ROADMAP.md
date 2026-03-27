# Roadmap — Symulator SEO

Narzędzie interaktywne na /narzedzia/symulator-seo.
Aktualny stan: 16 toggleów, 4 zakładki (Googlebot / RAG / A/R/E / Podgląd), mock strona agencji SEO.

---

## Faza 1 — Szybkie wygrane

### Presety / scenariusze
Przyciski z gotowymi konfiguracjami togglei:
- `Nowa strona bez SEO` — prawie wszystko OFF
- `Dobra technicznie, słaba dla AI` — SEO ON, E-E-A-T/fakty/external OFF
- `E-commerce bez schema` — schema OFF, reszta ON
- `Po Helpful Content Update` — fakty + eeat OFF

### Share link
Zakoduj stan togglei w URL (`?t=10110101...`) → możliwość wysłania linku do konkretnej konfiguracji.

### Licznik problemów
Badge w nagłówku: `3 problemy · 2 ostrzeżenia` — zmienia się w czasie rzeczywistym.

---

## Faza 2 — Rozbudowa zawartości

### Więcej typów stron
Przełącznik typu strony (zamiast tylko LocalBusiness):
- `Artykuł blogowy` — Article schema, autor jako E-E-A-T
- `Strona produktu e-commerce` — Product schema, cena, recenzje
- `Strona główna` — Organization schema, logo

Każdy typ = inne priorytety i efekty w analizie.

### Tryb porównania A vs B
Zablokuj aktualny stan jako "Przed", ustaw drugi i porównaj obok siebie.

### Szczegółowe tooltips
Każdy toggle ma ikonę `?` → mini-wyjaśnienie + link do wpisu w bazie wiedzy.

---

## Faza 3 — Zaawansowane

### Symulator zapytań AI
Wpisujesz prompt → symulator odpowiada jaką szansę ma strona na cytowanie i dlaczego.

### Analiza prawdziwego URL
Wklejasz URL → API parsuje stronę i automatycznie ustawia togglei. Potem symulacja "co gdyby".
*(Wymaga: Vercel Function + parser HTML lub zewnętrzne API)*

### Tryb audytu krok po kroku
Wizard: "Krok 1/8: sprawdź robots.txt → Krok 2/8: dodaj title tag..." z wyjaśnieniami i checkboxami.

---

## Długoterminowa wizja

Narzędzia SEO są naturalnie cytowane i linkowane — to buduje Authority i Extractability strony zgodnie z tym co opisujemy w bazie wiedzy. Symulator jako wyróżnik maxbiderman.pl.
