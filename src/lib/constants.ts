/**
 * VKS Group — Site-wide Constants
 * All user-facing strings extracted here for i18n-ready architecture.
 * Future localization: swap this file or add RU/BY dictionaries.
 */

export const SITE = {
    name: 'VKS Group',
    url: 'https://vksgroup.by',
    locale: 'ru-BY',
    description: 'VKS Group — Инженерные системы и цифровая инфраструктура',
} as const;

export const NAV_LINKS = [
    { label: 'Услуги', href: '/uslugi' },
    { label: 'О компании', href: '/o-kompanii' },
    { label: 'Контакты', href: '/kontakty' },
] as const;

export const CONTACTS = {
    email: 'office@vksgroup.by', // Primary email
    phones: [
        { label: 'МТС', value: '+375 (33) 315-91-91' },
        { label: 'A1', value: '+375 (29) 670-91-91' },
        { label: 'Life', value: '+375 (25) 770-91-91' },
        { label: 'гор.', value: '+375 (17) 370-91-91' }
    ],
    address: {
        short: 'г. Минск, ул. Казинца, 11a, офис A806',
        full: [
            '220099',
            'Беларусь, г.Минск',
            'ул.Казинца, 11a',
            'БЦ "Гермес", A806'
        ]
    },
    requisites: [
        'УНП 193201443',
        'ОКПО 502685295000',
        'ОКЭД 46510'
    ]
} as const;

export const OG_DEFAULTS = {
    title: SITE.name,
    description: SITE.description,
    type: 'website' as const,
    locale: SITE.locale,
    siteName: SITE.name,
} as const;


