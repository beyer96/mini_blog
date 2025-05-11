# Projekt 2: Blogovací platforma (Mini Blog)

Tento projekt je o něco komplexnější a zahrnuje práci s uživateli, vytváření a zobrazování obsahu.

**Technologie:**

* **Backend:** Node.js, Express.js, JWT (pro autentizaci)
* **Databáze:** Postgres, TypeORM
* **Frontend:** React, Redux (pro složitější správu stavu), React Router (pro navigaci mezi stránkami)

**Požadavky:**

## Backend (API)

* **Autentizace:**
    * `POST /auth/register`: Registrace nového uživatele (vyžaduje uživatelské jméno a heslo).
    * `POST /auth/login`: Přihlášení existujícího uživatele (vrací JWT token).
* **Uživatelé:**
    * `GET /users/:id`: Získání informací o uživateli (chráněný endpoint, vyžaduje JWT).
* **Články:**
    * `GET /posts`: Získání seznamu všech publikovaných článků (s možností stránkování, filtrování - volitelné).
    * `GET /posts/:slug`: Získání konkrétního článku podle jeho unikátního slug (např. "muj-prvni-clanok").
    * `POST /posts`: Vytvoření nového článku (chráněný endpoint, vyžaduje JWT, data článku: titulek, obsah, slug).
    * `PUT /posts/:id`: Aktualizace existujícího článku (chráněný endpoint, vyžaduje JWT).
    * `DELETE /posts/:id`: Smazání článku (chráněný endpoint, vyžaduje JWT).
* Použij Express.js pro routing a middleware (včetně middleware pro ověření JWT).
* Použij TypeORM pro interakci s Postgres databází (definuj entity pro `User` a `Post` s příslušnými atributy a relacemi).

## Frontend (React)

* **Autentizace:**
    * Stránka pro registraci a přihlášení uživatelů.
    * Ukládání JWT tokenu v prohlížeči (např. `localStorage` nebo `sessionStorage`).
    * Automatické posílání JWT tokenu v hlavičkách autorizačních požadavků na backend.
* **Zobrazení článků:**
    * Úvodní stránka se seznamem nejnovějších článků (náhledy).
    * Stránka pro zobrazení celého článku.
* **Správa článků (pouze pro přihlášené uživatele):**
    * Stránka pro vytvoření nového článku (jednoduchý textový editor).
    * Stránka pro úpravu existujících článků.
* Použij Redux pro globální stav (např. informace o přihlášeném uživateli, seznam článků).
* Použij React Router pro navigaci mezi stránkami (domů, přihlášení, registrace, zobrazení článku, správa článků).
* Implementuj ochranu administrátorských stránek (`/admin/*`) pomocí `PrivateRoute` komponenty (přesměrování na přihlášení, pokud uživatel není autentizován).

## Volitelné rozšíření (pro lehce mediorní úroveň):

* Implementace pokročilejšího textového editoru (např. TinyMCE nebo CKEditor).
* Možnost přidávat obrázky k článkům (upload na server, ukládání cest).
* Komentáře k článkům (další databázová entita, API endpointy).
* Kategorizace článků.
* Validace vstupních dat na backendu i frontendu.
