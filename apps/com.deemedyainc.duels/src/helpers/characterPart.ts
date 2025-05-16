
export function getPartRarity(characterPart: any) : string | null
    {
        const rarityInfo = characterPart.method("get_rarity").invoke();
        const rarityName : Il2Cpp.String = rarityInfo.field("title_temp").value;
        return rarityName.content;
    }

export function getPartQuality(characterPart : any): number | null
    {
        const qualityInfo = characterPart.method("get_quality").invoke();
        const qualityIndex : number = qualityInfo.field("index").value;
        return qualityIndex;
    }