/**
 * VKS Group — Site-wide Constants
 * All user-facing strings extracted here for i18n-ready architecture.
 * Future localization: swap this file or add RU/BY dictionaries.
 */

export const SITE = {
    name: 'VKS Group',
    url: 'https://vksgroup.by',
    locale: 'ru-BY',
    description: 'VKS Group — цифровая инфраструктура и IT-решения',
} as const;

export const NAV_LINKS = [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: '/uslugi' },
    { label: 'О компании', href: '/o-kompanii' },
    { label: 'Контакты', href: '/kontakty' },
] as const;

export const CONTACTS = {
    phone: '+375 (XX) XXX-XX-XX',
    email: 'info@vksgroup.by',
    address: 'г. Минск, Республика Беларусь',
} as const;

export const OG_DEFAULTS = {
    title: SITE.name,
    description: SITE.description,
    type: 'website' as const,
    locale: SITE.locale,
    siteName: SITE.name,
} as const;
