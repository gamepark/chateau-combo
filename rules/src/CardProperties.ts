import { isEnumValue } from "@gamepark/rules-api"

export enum NobleCard {
    Noble1 = 1,
    Noble2,
    Noble3,
    Noble4,
    Noble5,
    Noble6,
    Noble7,
    Noble8,
    Noble9,
    Noble10
}

export enum VillageCard {
    Village1 = 1,
    Village2,
    Village3,
    Village4,
    Village5,
    Village6,
    Village7,
    Village8,
    Village9,
    Village10
}

export const nobleCards = Object.values(NobleCard).filter<NobleCard>(isEnumValue)
export const villageCards = Object.values(VillageCard).filter<VillageCard>(isEnumValue)