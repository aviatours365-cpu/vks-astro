# VKS-site — Архитектура проекта

> **Цель документа:** Зафиксировать правила разработки. Каждый разработчик (и AI-модель) **обязан** прочитать этот документ перед работой с кодом. Также см. `.cursorrules` для Machine-Readable правил.

---

## 1. Философия

| Принцип            | Значение                                                                              |
| ------------------ | ------------------------------------------------------------------------------------- |
| **MPA-first**      | Каждая страница — отдельный HTML-документ. Никаких SPA-роутеров.                      |
| **Static-first**   | `output: 'static'`. Клиентский JS — только для простого интерактива через `<script>`. |
| **Zero External**  | Никаких внешних CDN. Шрифты самохостятся. Нулевые внешние запросы при загрузке.       |
| **Lighthouse 100** | Performance-бюджет — жёсткий потолок. Каждый коммит должен проходить бюджет.          |

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

| Папка       | Назначение                | Макс. строк | Правила                                        |
| ----------- | ------------------------- | ----------- | ---------------------------------------------- |
| `layout/`   | На **каждой** странице    | 150         | Структурные обёртки. Используют `ui/`.         |
| `sections/` | Крупные блоки контента    | 200         | Секции страниц. Используют `ui/`.              |
| `ui/`       | Переиспользуемые элементы | 80          | Только визуал. Обязательный `interface Props`. |

### 3.2 Зависимости (DAG — без циклов)

```
pages → PageLayout → RootLayout
                   → layout/* → ui/*
sections/* → ui/*
```

> **Запрещено:** `ui → sections`, `sections → layout`, циклические зависимости.

### 3.3 Strict Content-Driven Architecture (ВАЖНО ДЛЯ АГЕНТОВ)

Любой хардкод (статичный текст, заголовки, описания) внутри HTML-тегов папок `src/components/sections/` и `src/components/ui/` **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕН**.
Все компоненты должны быть "Глупыми" (Presentational Components). Они обязаны получать контент исключительно через:
1. `Astro.props` (передается от Страницы, которая формирует данные).
2. `getCollection(...)` (динамическая загрузка из Collections API).
3. `src/lib/constants.ts` (глобальные элементы UI — кнопки меню, подвал).

### 3.4 Запреты

| ❌ Запрещено                 | ✅ Правильно                              |
| ---------------------------- | ----------------------------------------- |
| Хардкод контента в UI        | `Astro.props` или `Content Collections`   |
| `<style>` внутри компонента  | Tailwind-классы или `@layer` в `main.css` |
| Несортированные Tailwind классы | Использование Prettier (`npm run format`) |
| `<script is:inline>`         | Bundled `<script>` с TypeScript           |
| `<img>` тег                  | `<Image>` или `<Picture>` из `astro:assets`|
| Изображения в LCP (Hero)     | Строго `<Picture formats={['avif', 'webp']}>` |
| Inline SVG иконки            | `Icon.astro` компонент                    |
| Хардкоженные строки UI       | `lib/constants.ts`                        |
| Хардкоженные цвета `#007BFF` | CSS-переменные → Tailwind токены          |
| `@import` в CSS              | `@font-face` + Tailwind directives        |

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
5. **Markdown/MDX** — форматируется строго через плагин `@tailwindcss/typography` (классы семейства `.prose`).
6. **Prettier + Tailwind** — разработчики и агенты обязаны запускать `npm run format` перед коммитом. Порядок утилитарных классов должен быть строго каноничным. Авто-сортировка защищает от merge conflicts.

---

## 5. JavaScript

### Стратегия: Zero JS по умолчанию

| Правило                            | Обоснование                                    |
| ---------------------------------- | ---------------------------------------------- |
| Запрет `<script is:inline>`        | Не проходит через bundler, нет TS, дублируется |
| Запрет внешних CDN-скриптов        | Внешние запросы убивают FCP                    |
| Bundled `<script>` для интерактива | TS-типизация, tree-shaking, dedup              |

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

### Динамические маршруты (SSG)
- Для генерации страниц из коллекций (например, `/uslugi/[slug].astro` или правовых документов `/[...slug].astro`) **обязательно** использование функции `getStaticPaths()`. Проект собирается в режиме Static, поэтому все URL должны быть известны на этапе сборки.

---

## 7. Performance-бюджет

| Метрика                    | Бюджет  | Обоснование            |
| -------------------------- | ------- | ---------------------- |
| **Lighthouse Performance** | ≥ 95    | Целевой порог          |
| **FCP**                    | < 0.8 с | Мгновенная отрисовка   |
| **LCP**                    | < 1.5 с | Hero-блок              |
| **TBT**                    | 0 мс    | Zero JS blocking       |
| **CLS**                    | 0       | Стабильный layout      |
| **HTML (gzip)**            | < 15 KB | Inline CSS             |
| **JS (total)**             | < 10 KB | Минимальный интерактив |
| **Внешние запросы**        | 0       | Self-hosted всё        |

---

## 8. Чеклист перед коммитом

- [ ] `npm run build` — 0 ошибок?
- [ ] `npm run lint` — пройдена проверка на Anti-Monolith и ESLint?
- [ ] `npm run format` — применена авто-сортировка классов Tailwind (Prettier)?
- [ ] Все файлы < 200 строк?
- [ ] Полностью отсутствует хардкод текста в компонентах `src/components`?
- [ ] Нет `<style>`, `<script is:inline>`?
- [ ] Все импорты через `@/`?
- [ ] Все страницы используют `PageLayout`?
- [ ] В блоке Hero используется `<Picture>` с `loading="eager"` и `avif`?
- [ ] Для всех изображений стоит `alt="..."`?

**⚠️ ПАМЯТКА ДЛЯ AI АГЕНТОВ:**
Относитесь критически к написанию кода по этому проекту. Принимается исключительно строго внедренные правила из таблиц выше. Полумеры вроде "Только 90% компонентов разделили данные и представление" не засчитываются. Либо 100%, либо задача не выполнена.
