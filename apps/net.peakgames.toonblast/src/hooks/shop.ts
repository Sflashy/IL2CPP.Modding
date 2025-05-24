import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";


export function registerShopHooks(image: Il2Cpp.Image) {
    logHook("shop hooks registered");
    overrideDailyDeals(image, 1, 1000, 1000, 0);
}


function overrideDailyDeals(assembly: Il2Cpp.Image, _inventoryItemType: number, _amount: number, _stockCount: number, _price: number) {
    const dailyDealsItemData = getClass(assembly, "Shop.DailyDeals.DailyDealsItemData");
    const encryptedMethod = getMethod(dailyDealsItemData, "JOFPHNMGGJE");
    encryptedMethod.implementation = function ()
    {
        let dailyDealsItemData = assembly.class("Shop.DailyDeals.DailyDealsItemData").alloc();
        dailyDealsItemData.method(".ctor", 5).invoke(_inventoryItemType, _amount, _stockCount, _price, Il2Cpp.string(""));
        let inventoryItemType = dailyDealsItemData.field("InventoryItemType").value;
        let amount = dailyDealsItemData.field("Amount").value;
        let stockCount = dailyDealsItemData.field("StockCount").value;
        let price = dailyDealsItemData.field("Price").value;
        logHook(`Daily Deals Overridden: ${inventoryItemType} ${amount} ${stockCount} ${price}`);
        return dailyDealsItemData;
    }
}
