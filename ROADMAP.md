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

## Faza 2 — Rozbudowa zawartości ✅ ZREALIZOWANA

### Więcej typów stron ✅
Przełącznik: Agencja SEO (LocalBusiness) / Artykuł blogowy (Article) / Produkt e-commerce (Product) / Strona główna (Organization).
Każdy typ ma własną treść podglądu, schema i dynamiczne dane w analizach.

### Tooltips ✅
Hover na etykiecie każdego elementu w podglądzie → dymka z opisem co to jest i dlaczego ma znaczenie.

### Tryb porównania A vs B — WYKREŚLONY
Layoutowo niewykonalne bez chaosu (potrzeba 4 kolumn). Zastąpiony przez presety + share link — osiągają ten sam efekt edukacyjny.

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
