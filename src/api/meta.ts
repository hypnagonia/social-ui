export interface ContractMeta {
    image: string,
    itemsTotal: string,
    ownersTotal: string,
    floorPrice: string,
    openSeaVerified: boolean,
    name: string,
    symbol: string,
    links: {
        twitter?: string,
        medium?: string,
        website?: string,
        discord?: string,
        github?: string,
        telegram?: string,
        instagram?: string,
        email?: string
    }
}

export const normalizeLinks = {
    twitter: (v: string) => v.indexOf('twitter') !== -1 ? v : `https://twitter.com/${v}`,
    medium: (v: string) => v.indexOf('medium') !== -1 ? v : `https://medium.com/${v}`,
    website: (v: string) => v,
    discord: (v: string) => v.indexOf('discord') !== -1 ? v : `https://discord.com/${v}`,
    github: (v: string) => v.indexOf('github') !== -1 ? v : `https://github.com/${v}`,
    telegram: (v: string) => v.indexOf('t.me') !== -1 ? v : `https://t.me/${v}`,
    instagram: (v: string) => v.indexOf('instagram') !== -1 ? v : `https://www.instagram.com/${v}`,
    email: (v: string) => `mailto:${v}`,
}

