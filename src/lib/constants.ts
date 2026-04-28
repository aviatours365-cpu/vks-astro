/**
 * VKS Group - Site-wide Constants
 * All user-facing strings extracted here for i18n-ready architecture.
 * Future localization: swap this file or add RU/BY dictionaries.
 */




export const SITE = {
  name: 'ООО "ВКС Технологии и системы"',
  url: "https://vksgroup.by",
  locale: "ru-BY",
  description:
    "Проектируем и внедряем ИТ-системы любого масштаба. Инженерная точность и безопасность данных.",
  privacyPolicyUrl: "/VKS_PPD.pdf",
} as const;

export const NAV_LINKS = [
  { label: "Услуги", href: "/uslugi" },
  { label: "Решения", href: "/resheniya" },
  { label: "Контакты", href: "/kontakty" },
] as const;

export const CONTACTS = {
  email: "info@vksgroup.by",
  phones: [
    { label: "", value: "+375 (17) 370-91-91" },
    { label: "", value: "+375 (33) 315-91-91" },
    { label: "", value: "+375 (29) 670-91-91" },
    { label: "", value: "+375 (25) 770-91-91" },
  ],
  address: {
    short: "г. Минск, ул.Казинца, 11а, оф. A806",
    full: [
      "220099",
      "Республика Беларусь",
      "г. Минск, ул. Казинца, 11а",
      'БЦ "Гермес", оф. A806',
    ],
  },
  requisites: ["УНП 193201443", "ОКПО 502685295000", "ОКОГУ 46510"],
  socials: [
    {
      name: "telegram" as const,
      label: "Telegram",
      href: "https://t.me/VKSsales_bot",
    },
  ],
} as const;

export const UI = {
  navigation: "Навигация",
  phones: "Телефоны",
  contacts: "Контакты",
  office: "Офис",
  email: "E-mail",
  allRightsReserved: "Все права защищены",
  privacyPolicy: "Политика конфиденциальности",
  cookiePolicy: "Файлы cookie",
  discussProject: "Консультация",
  menu: "Меню",
  openMenu: "Открыть меню",
  closeMenu: "Закрыть меню",
} as const;

export const NAV_ANCHORS = [
  { label: "Услуги", href: "#services" },
  { label: "Решения", href: "#solutions" },
  { label: "Контакты", href: "#contact" },
] as const;

export * from "./sections";
