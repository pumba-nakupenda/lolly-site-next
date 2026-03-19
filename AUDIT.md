# Audit du site LOLLY Agency (lolly.sn)

**Date** : 19 mars 2026
**Stack** : Next.js 16.1.6 / React 19 / Tailwind CSS v4 / Sanity CMS / Framer Motion
**Deploiement** : Vercel

---

## Table des matieres

1. [Securite](#1-securite)
2. [Performance](#2-performance)
3. [SEO](#3-seo)
4. [Accessibilite](#4-accessibilite)
5. [Qualite du code](#5-qualite-du-code)
6. [Resume et priorites](#6-resume-et-priorites)

---

## 1. Securite

### CRITIQUE

| # | Probleme | Fichier | Ligne | Impact |
|---|----------|---------|-------|--------|
| S1 | **URL webhook n8n en dur** dans le code comme fallback | `src/components/ContactModal.tsx` | 13 | N'importe qui peut declencher des actions sur la plateforme n8n |
| S2 | **URL webhook dupliquee** en dur | `src/components/contact/ContactClient.tsx` | 9 | Meme risque que S1 |
| S3 | **Mot de passe Sanity Studio en dur** (`lolly2024`) dans une variable `NEXT_PUBLIC_` (exposee cote client) | `src/app/studio/[[...tool]]/Studio.tsx` | 17 | Le mot de passe est visible dans le bundle JS client |
| S4 | **Sanity Studio accessible publiquement** avec authentification client-side uniquement (sessionStorage) | `src/app/studio/[[...tool]]/page.tsx` | 16 | Contournable via les DevTools du navigateur |

### HAUTE

| # | Probleme | Fichier | Impact |
|---|----------|---------|--------|
| S5 | **Headers de securite manquants** dans `next.config.mjs` : pas de CSP, HSTS, X-Frame-Options, X-XSS-Protection | `next.config.mjs` | Vulnerable au clickjacking, XSS, injection |
| S6 | **Pas de validation serveur** des formulaires (email, telephone) — uniquement `required` HTML5 | `ContactModal.tsx`, `ContactClient.tsx` | Donnees malformees envoyees au webhook |
| S7 | **Pas de rate limiting** sur la soumission des formulaires | `ContactModal.tsx`, `ContactClient.tsx` | Spam et abus du webhook |
| S8 | **Sanity Vision Tool active en production** — permet des requetes GROQ arbitraires | `studio/sanity.config.ts:14` | Acces direct aux donnees du CMS |

### MOYENNE

| # | Probleme | Fichier |
|---|----------|---------|
| S9 | `dangerouslySetInnerHTML` avec template literal pour Google Analytics | `GoogleAnalytics.tsx:17` |
| S10 | Honeypot nomme trop explicitement `honeypot` | `ContactClient.tsx:181-191` |
| S11 | Manipulation directe du DOM (createElement/appendChild) au lieu de patterns React | `VCardClient.tsx:92-98` |

### Recommandations securite

1. **Supprimer toutes les valeurs par defaut hardcodees** (webhook URL, mot de passe studio) — utiliser uniquement les variables d'environnement
2. **Deplacer le mot de passe studio** vers une variable privee (pas `NEXT_PUBLIC_`) et implementer une authentification server-side
3. **Ajouter les headers de securite manquants** dans `next.config.mjs` :
   ```js
   { key: 'Content-Security-Policy', value: "default-src 'self'; ..." },
   { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
   { key: 'X-Frame-Options', value: 'DENY' },
   { key: 'X-XSS-Protection', value: '1; mode=block' },
   { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
   ```
4. **Ajouter une validation pattern** cote client et une validation cote serveur pour les formulaires
5. **Desactiver le Vision Tool** en production dans `sanity.config.ts`

---

## 2. Performance

### CRITIQUE

| # | Probleme | Fichier(s) | Impact |
|---|----------|------------|--------|
| P1 | **`revalidate` manquant** sur 11+ pages (contact, about, legal, cgv, vcard, 7 pages services) | `src/app/*/page.tsx` | Pages re-generees a chaque requete au lieu d'ISR |
| P2 | **Aucune memoisation** (`React.memo`, `useMemo`, `useCallback`) sur 26+ composants | Tous les composants | Re-rendus inutiles a chaque mise a jour parent |
| P3 | **Preloader bloquant de 2.5s** sur chaque premiere visite | `Preloader.tsx:8-12` | Impact direct sur FCP et TTI |
| P4 | **CustomCursor : listener `mousemove` sans throttle** — se declenche des centaines de fois par seconde | `CustomCursor.tsx:13-22` | Recalculs de style constants sur desktop |

### HAUTE

| # | Probleme | Fichier | Impact |
|---|----------|---------|--------|
| P5 | **26 composants client** (`"use client"`) dont certains pourraient etre Server Components | Multiples | Bundle JS client surdimensionne |
| P6 | `JsonLd.tsx` et `GoogleAnalytics.tsx` utilisent `"use client"` inutilement | `JsonLd.tsx:1`, `GoogleAnalytics.tsx:1` | Ces composants n'ont pas besoin d'hydratation client |
| P7 | **Animations Hero lourdes** : 4 transformations simultanees (scale, rotate, x, y) sur effets de blur | `Hero.tsx:73-92` | Calculs GPU importants |
| P8 | **Marquee** : 8 copies du contenu pour boucle infinie | `Marquee.tsx:22` | DOM surdimensionne |
| P9 | **Pas de blur placeholder** (LQIP) sur les images | `OptimizedImage.tsx` | Mauvaise perception du chargement |

### MOYENNE

| # | Probleme | Fichier |
|---|----------|---------|
| P10 | Detection mobile dupliquee dans 5+ composants au lieu d'utiliser le hook `useIsMobile` existant | `Hero.tsx`, `HomeClient.tsx`, `ServicesClient.tsx`, `PortfolioClient.tsx` |
| P11 | `styled-components` dans `package.json` mais non utilise — dependance morte | `package.json:28` |
| P12 | Optimisations next.config manquantes : `poweredByHeader: false`, compression Brotli | `next.config.mjs` |
| P13 | `PageLoader.tsx` — doublon fonctionnel du `Preloader.tsx` | `PageLoader.tsx` |

### Recommandations performance

1. **Ajouter `export const revalidate = 60`** sur toutes les pages avec fetch Sanity
2. **Convertir en Server Components** : `JsonLd.tsx`, `GoogleAnalytics.tsx`, et tout composant sans hooks/events
3. **Supprimer ou reduire le Preloader** — 2.5s de blocage est excessif
4. **Throttler le listener mousemove** du CustomCursor (requestAnimationFrame)
5. **Ajouter `React.memo`** sur les composants stables (ClientLogos, Footer, etc.)
6. **Utiliser le hook `useIsMobile`** partout au lieu de dupliquer la detection
7. **Supprimer `styled-components`** du package.json si non utilise
8. **Ajouter des blur placeholders** aux images via `placeholder="blur"`

---

## 3. SEO

### HAUTE

| # | Probleme | Fichier |
|---|----------|---------|
| SEO1 | **Metadata OG images sans dimensions** (width/height manquants) sur les pages services | `services/design/page.tsx:15`, `services/social/page.tsx:15` |
| SEO2 | **`openGraph.images` manquant** sur les pages About et Contact | `about/page.tsx`, `contact/page.tsx` |
| SEO3 | **`twitter` metadata manquant** sur la page Contact | `contact/page.tsx` |

### MOYENNE

| # | Probleme | Fichier |
|---|----------|---------|
| SEO4 | Images OG provenant d'Unsplash au lieu d'images propres au site | `services/design/page.tsx`, `services/social/page.tsx` |
| SEO5 | Schema.org Organization : `areaServed` trop generique ("SN") | `page.tsx:31-49` |
| SEO6 | Schema.org BlogPosting : propriete `inLanguage` manquante | `blog/[slug]/page.tsx` |
| SEO7 | Export `viewport` manquant dans le root layout (depend des defauts Next.js) | `layout.tsx` |

### POINTS POSITIFS

- Sitemap dynamique bien implementee avec blog posts Sanity
- `robots.txt` correctement configure
- JSON-LD structure data sur pages cles (Organization, BlogPosting, BreadcrumbList)
- `lang="fr"` correctement defini
- Metadata template `"%s | LOLLY Agency"` sur toutes les pages
- ISR configure sur les pages principales (home, blog, portfolio)

---

## 4. Accessibilite

### CRITIQUE

| # | Probleme | Fichier | Ligne(s) |
|---|----------|---------|----------|
| A1 | **Labels de formulaire sans `htmlFor`** — les inputs ne sont pas associes a leurs labels | `ContactModal.tsx` | 168-232 |
| A2 | **Meme probleme** sur le formulaire Contact page | `ContactClient.tsx` | 198-282 |
| A3 | **Dropdown Services non accessible au clavier** — utilise `onMouseEnter/Leave` sans support clavier | `Navbar.tsx` | 91-125 |
| A4 | **Cartes Portfolio** : `div` avec `onClick` au lieu de `button` — inaccessible au clavier | `PortfolioClient.tsx` | 165 |
| A5 | **Lien "Skip to main content" manquant** | `ClientLayout.tsx` | — |

### HAUTE

| # | Probleme | Fichier |
|---|----------|---------|
| A6 | `aria-expanded` et `aria-haspopup` manquants sur le dropdown Services | `Navbar.tsx` |
| A7 | Selects (code pays, sujet) sans `aria-label` | `ContactModal.tsx`, `ContactClient.tsx` |
| A8 | Modales sans piege de focus (focus trap) — le focus peut sortir de la modale | `ContactModal.tsx`, `PortfolioClient.tsx` |
| A9 | Bouton chevron dans le menu mobile sans `aria-label` | `Navbar.tsx:194` |
| A10 | Icones sociales dans le menu mobile sans texte accessible | `Navbar.tsx:249-259` |

### MOYENNE

| # | Probleme | Fichier |
|---|----------|---------|
| A11 | Pas de `aria-required` sur les champs obligatoires des formulaires | `ContactModal.tsx`, `ContactClient.tsx` |
| A12 | Pas de `aria-invalid` / `aria-describedby` pour les messages d'erreur | `ContactModal.tsx`, `ContactClient.tsx` |
| A13 | Alt text des avatars testimonials : utilise le role au lieu du nom | `HomeClient.tsx:200-207` |
| A14 | Pas de `aria-current="page"` sur le lien de navigation actif | `Navbar.tsx` |
| A15 | Contraste des couleurs potentiellement insuffisant : `text-gray-400` sur fond sombre | `Navbar.tsx:102`, `Footer.tsx:45-49` |
| A16 | Pas de gestion de la touche Escape pour fermer les modales | `VCardProClient.tsx:152` |

### Recommandations accessibilite

1. **Associer tous les labels aux inputs** avec `htmlFor` + `id`
2. **Ajouter un lien "Aller au contenu principal"** en debut de `ClientLayout.tsx`
3. **Rendre le dropdown clavier-accessible** avec `aria-expanded`, `aria-haspopup`, gestion des fleches
4. **Utiliser `<button>`** au lieu de `<div onClick>` pour les elements interactifs
5. **Implementer le focus trap** dans les modales
6. **Ajouter `aria-label`** sur tous les boutons icones et selects

---

## 5. Qualite du code

### HAUTE

| # | Probleme | Fichier(s) |
|---|----------|------------|
| Q1 | **Types `any` utilises** au lieu d'interfaces TypeScript propres | `JsonLd.tsx:5`, `BlogPostClient.tsx:39`, `ServicesClient.tsx:19-22` |
| Q2 | **`catch (error: any)`** sans typage correct des erreurs | `ContactModal.tsx:80`, `ContactClient.tsx:80` |
| Q3 | **`console.error` / `console.warn`** restes en production (10+ occurrences) | Multiples fichiers (voir liste ci-dessous) |
| Q4 | **Type `Function`** utilise au lieu d'un type de fonction precis | `ServicesClient.tsx:46` |

### Console statements a supprimer

| Fichier | Ligne |
|---------|-------|
| `ContactModal.tsx` | 81 |
| `ContactClient.tsx` | 81 |
| `OptimizedImage.tsx` | 37 |
| `blog/[slug]/page.tsx` | 17, 97, 122 |
| `blog/page.tsx` | 49 |
| `page.tsx` (home) | 75 |
| `portfolio/page.tsx` | 57 |
| `sitemap.ts` | 18 |
| `VCardClient.tsx` | 50 |

### MOYENNE

| # | Probleme | Fichier |
|---|----------|---------|
| Q5 | Gestion d'erreurs incomplete dans les fetch (pas de parsing du body en cas d'erreur) | `ContactModal.tsx:62-85` |
| Q6 | URLs externes hardcodees (reseaux sociaux, Google Maps) sans centralisation | Multiples composants |
| Q7 | Dependance `styled-components` non utilisee | `package.json` |

---

## 6. Resume et priorites

### Actions immediates (CRITIQUE)

| # | Action | Categorie |
|---|--------|-----------|
| 1 | Supprimer l'URL webhook et le mot de passe studio hardcodes | Securite |
| 2 | Implementer une authentification server-side pour Sanity Studio | Securite |
| 3 | Ajouter les headers de securite (CSP, HSTS, X-Frame-Options) | Securite |
| 4 | Ajouter `revalidate` sur les 11+ pages manquantes | Performance |
| 5 | Associer les labels de formulaire aux inputs (`htmlFor` + `id`) | Accessibilite |
| 6 | Ajouter un lien "Skip to content" | Accessibilite |

### Actions haute priorite

| # | Action | Categorie |
|---|--------|-----------|
| 7 | Convertir `JsonLd` et `GoogleAnalytics` en Server Components | Performance |
| 8 | Reduire/supprimer le Preloader de 2.5s | Performance |
| 9 | Throttler le listener mousemove du CustomCursor | Performance |
| 10 | Rendre le dropdown navigation accessible au clavier | Accessibilite |
| 11 | Implementer le focus trap dans les modales | Accessibilite |
| 12 | Ajouter la validation pattern sur les formulaires | Securite |
| 13 | Completer les metadata OG sur toutes les pages | SEO |
| 14 | Remplacer les types `any` par des interfaces TypeScript | Code |

### Actions moyenne priorite

| # | Action | Categorie |
|---|--------|-----------|
| 15 | Ajouter `React.memo` sur les composants stables | Performance |
| 16 | Utiliser le hook `useIsMobile` partout | Performance |
| 17 | Supprimer `styled-components` du package.json | Performance |
| 18 | Ajouter des blur placeholders sur les images | Performance |
| 19 | Supprimer tous les `console.error/warn` en production | Code |
| 20 | Ajouter `aria-label` sur les boutons icones et selects | Accessibilite |
| 21 | Desactiver le Vision Tool en production | Securite |

---

**Total des problemes identifies** : ~50
**Critiques** : 11 | **Hauts** : 20 | **Moyens** : 19
