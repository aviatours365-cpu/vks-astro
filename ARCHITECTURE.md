# VKS-site — Архитектура проекта

> **Цель документа:** Зафиксировать правила разработки. Каждый разработчик (и AI-модель) **обязан** прочитать этот документ перед работой с кодом. Также см. `.cursorrules` для Machine-Readable правил.

---

## 1. Философия

| Принцип | Значение |
|---------|----------|
| **MPA-first** | Каждая страница — отдельный HTML-документ. Никаких SPA-роутеров. |
| **Static-first** | `output: 'static'`. Клиентский JS — только для простого интерактива через `<script>`. |
| **Zero External** | Никаких внешних CDN. Шрифты самохостятся. Нулевые внешние запросы при загрузке. |
| **Lighthouse 100** | Performance-бюджет — жёсткий потолок. Каждый коммит должен проходить бюджет. |

---

## 2. Структура `src/`

```
src/
├── assets/
│   ├── fonts/           # Self-hosted woff2 шрифты (Inter, Manrope)
│   ├── favicon.svg
│   ├── hero-bg.webp
│   └── logo.webp
├── components/
│   ├── layout/          # Каркас: Header, Footer, MobileMenu
│   ├── sections/        # Секции страниц: Hero, Services, UnderConstruction
│   └── ui/              # Кирпичики: Button, Icon, ServiceCard
├── content/
│   ├── config.ts        # Zod-схемы коллекций
│   ├── services/        # .mdx файлы услуг
│   └── legal/           # .mdx правовых документов
├── layouts/
│   ├── RootLayout.astro # <html>, <head>, мета-теги (НЕ использовать в pages напрямую)
│   └── PageLayout.astro # RootLayout + Header + <main> + Footer (ОБЯЗАТЕЛЬНО в pages)
├── lib/
│   └── constants.ts     # Все строковые константы
├── pages/               # File-based роутинг
├── styles/
│   └── main.css         # @font-face + Tailwind layers + CSS-переменные
└── utils/
    └── cn.ts            # clsx + tailwind-merge
```

---

## 3. Компоненты

### 3.1 Три уровня

| Папка | Назначение | Макс. строк | Правила |
|-------|-----------|-------------|---------|
| `layout/` | На **каждой** странице | 150 | Структурные обёртки. Используют `ui/`. |
| `sections/` | Крупные блоки контента | 200 | Секции страниц. Используют `ui/`. |
| `ui/` | Переиспользуемые элементы | 80 | Только визуал. Обязательный `interface Props`. |

### 3.2 Зависимости (DAG — без циклов)

```
pages → PageLayout → RootLayout
                   → layout/* → ui/*
sections/* → ui/*
```

> **Запрещено:** `ui → sections`, `sections → layout`, циклические зависимости.

### 3.3 Запреты

| ❌ Запрещено | ✅ Правильно |
|-------------|-------------|
| `<style>` внутри компонента | Tailwind-классы или `@layer` в `main.css` |
| `<script is:inline>` | Bundled `<script>` с TypeScript |
| `<img>` тег | `<Image>` из `astro:assets` |
| Inline SVG иконки | `Icon.astro` компонент |
| Хардкоженные строки | `lib/constants.ts` |
| Хардкоженные цвета `#007BFF` | CSS-переменные → Tailwind токены |
| `@import` в CSS | `@font-face` + Tailwind directives |

---

## 4. Стили

### 4.1 Архитектура

```
@font-face (main.css, self-hosted woff2)
       ↓
CSS Variables (:root в main.css)
       ↓
Tailwind tokens (tailwind.config.mjs extend)
       ↓
Utility-классы в шаблонах + cn() для условий
```

### 4.2 Правила

1. **Шрифты** — `@font-face` с `font-display: swap`, файлы в `src/assets/fonts/`.
2. **Цвета** — только CSS-переменные → Tailwind-токены.
3. **Анимации** — `keyframes` в `tailwind.config.mjs`. Не в компонентах.
4. **cn()** — обязателен для условной стилизации.

---

## 5. JavaScript

### Стратегия: Zero JS по умолчанию

| Правило | Обоснование |
|---------|------------|
| Запрет `<script is:inline>` | Не проходит через bundler, нет TS, дублируется |
| Запрет внешних CDN-скриптов | Внешние запросы убивают FCP |
| Bundled `<script>` для интерактива | TS-типизация, tree-shaking, dedup |

---

## 6. Шаблоны страниц

### Обязательный паттерн

```astro
---
import PageLayout from "@/layouts/PageLayout.astro";
import HeroSection from "@/components/sections/Hero.astro";
import { SITE } from "@/lib/constants";
---

<PageLayout title={`Заголовок | ${SITE.name}`}>
  <HeroSection />
</PageLayout>
```

> **Запрещено:** Импортировать `RootLayout`, `Header`, `Footer` напрямую в pages. Только через `PageLayout`.

---

## 7. Performance-бюджет

| Метрика | Бюджет | Обоснование |
|---------|--------|-------------|
| **Lighthouse Performance** | ≥ 95 | Целевой порог |
| **FCP** | < 0.8 с | Мгновенная отрисовка |
| **LCP** | < 1.5 с | Hero-блок |
| **TBT** | 0 мс | Zero JS blocking |
| **CLS** | 0 | Стабильный layout |
| **HTML (gzip)** | < 15 KB | Inline CSS |
| **JS (total)** | < 10 KB | Минимальный интерактив |
| **Внешние запросы** | 0 | Self-hosted всё |

---

## 8. Чеклист перед коммитом

- [ ] `npm run build` — 0 ошибок?
- [ ] Все файлы < 200 строк?
- [ ] Нет `<style>`, `<script is:inline>`?
- [ ] Нет хардкоженных цветов/строк?
- [ ] Все импорты через `@/`?
- [ ] Все страницы используют `PageLayout`?
- [ ] Все изображения через `<Image>`?
