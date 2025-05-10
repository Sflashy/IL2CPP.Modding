import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";


export function registerShopHooks(image: Il2Cpp.Image) {
    logHook("shop hooks registered");
    overrideDailyDeals(image);
}


function overrideDailyDeals(assembly: Il2Cpp.Image) {
    const dailyDealsItemData = getClass(assembly, "Shop.DailyDeals.DailyDealsItemData");
    const encryptedMethod = getMethod(dailyDealsItemData, "JOFPHNMGGJE");
    encryptedMethod.implementation = function ()
    {
        let dailyDealsItemData : any = assembly.class("Shop.DailyDeals.DailyDealsItemData").alloc();
        dailyDealsItemData.method(".ctor").invoke(1,640509,640509, 0);
        let inventoryItemType = dailyDealsItemData.field("InventoryItemType").value;
        let amount = dailyDealsItemData.field("Amount").value;
        let stockCount = dailyDealsItemData.field("StockCount").value;
        let price = dailyDealsItemData.field("Price").value;
        logHook(`Daily Deals Overridden: ${inventoryItemType} ${amount} ${stockCount} ${price}`);
        return dailyDealsItemData;
    }
}
