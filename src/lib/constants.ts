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

export const SERVICES = [
    {
        icon: 'audit' as const,
        title: 'IT-аудит',
        description: 'Обеспечиваем проведение анализа имеющейся информационной инфраструктуры и выдачу рекомендаций по улучшению',
        full: 'отдельного технического элемента или всей IT-инфраструктуры с целью её полного соответствия потребностям заказчика.',
    },
    {
        icon: 'consulting' as const,
        title: 'IT-консалтинг',
        description: 'На основании оценки текущего состояния IT-инфраструктуры, предлагаем решения, которые позволят существенно повысить',
        full: 'эффективность использования информационных технологий и оптимизировать затраты на её поддержку.',
    },
    {
        icon: 'deploy' as const,
        title: 'Внедрение',
        description: 'Осуществляем правильную организацию процесса внедрения информационной системы с разъяснением IT-специалистам',
        full: 'заказчика технической стороны вопроса и с учётом существующих в организации бизнес-процессов и имеющихся ресурсов.',
    },
    {
        icon: 'equipment' as const,
        title: 'Поставки оборудования',
        description: 'Представляем самые современные решения и обеспечиваем широкий выбор средств их реализации.',
        full: 'Налаженная работа с нашими поставщиками оборудования позволяет нам творчески подходить к сложным задачам и предлагать максимально эффективные индивидуальные решения.',
    },
    {
        icon: 'installation' as const,
        title: 'Монтаж',
        description: 'Устанавливаем оборудование и программное обеспечение, предлагая комплексный подход к созданию рабочих мест «под ключ», ',
        full: 'оказывая весь комплекс услуг по установке, пусконаладке и техническому обслуживанию IT-инфраструктуры для объектов любого типа и масштаба, и любой сложности.',
    },
    {
        icon: 'support' as const,
        title: 'Сопровождение',
        description: 'Оказываем сопровождение информационных систем – процесс в жизненном цикле любой IT-инфраструктуры, ',
        full: 'от которого в дальнейшем зависит как стабильность работы информационных систем в целом, так и результативность использования информационных сервисов.',
    },
] as const;
