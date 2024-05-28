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

export enum BannerType {
    Noble = 1, Village
}

export enum BlazonType {
    Noble = 1,
    Prayer, 
    Teacher, 
    Soldier,
    Worker, 
    Farmer, 
}

export class CardPattern {
    name:string
    cost:number
    banner?:BannerType
    canSwapMessengerToken:boolean
    blazon:BlazonType[]
    // TODO : ImmediatEffet
    // TODO : ScoringMethod

    constructor(name:string, cost:number, canSwapMessengerToken:boolean, blazon:BlazonType[], banner?:BannerType){
        this.name = name,
        this.cost = cost,
        this.banner = banner,
        this.canSwapMessengerToken = canSwapMessengerToken
        this.blazon = blazon
    }
}

export const NobleCardsObjects = {
    [NobleCard.Noble1]: new CardPattern("Noble1", 1, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble2]: new CardPattern("Noble2", 2, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble3]: new CardPattern("Noble3", 3, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble4]: new CardPattern("Noble4", 4, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble5]: new CardPattern("Noble5", 5, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble6]: new CardPattern("Noble6", 6, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble7]: new CardPattern("Noble7", 7, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble8]: new CardPattern("Noble8", 8, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble9]: new CardPattern("Noble9", 9, false, [BlazonType.Noble], BannerType.Noble),
    [NobleCard.Noble10]: new CardPattern("Noble10", 10, false, [BlazonType.Noble], BannerType.Noble)
}

export const VillageCardsObjects = {
    [VillageCard.Village1]: new CardPattern("Village1", 1, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village2]: new CardPattern("Village2", 2, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village3]: new CardPattern("Village3", 3, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village4]: new CardPattern("Village4", 4, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village5]: new CardPattern("Village5", 5, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village6]: new CardPattern("Village6", 6, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village7]: new CardPattern("Village7", 7, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village8]: new CardPattern("Village8", 8, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village9]: new CardPattern("Village9", 9, false, [BlazonType.Farmer], BannerType.Village),
    [VillageCard.Village10]: new CardPattern("Village10", 10, false, [BlazonType.Farmer], BannerType.Village)
}

export const nobleCards = Object.values(NobleCard).filter<NobleCard>(isEnumValue)
export const villageCards = Object.values(VillageCard).filter<VillageCard>(isEnumValue)

