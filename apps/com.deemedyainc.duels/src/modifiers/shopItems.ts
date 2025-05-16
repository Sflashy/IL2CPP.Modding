import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideItemAvailability(assembly: Il2Cpp.Image)
{
    const itemModelFreeShopItem = getClass(assembly, "Galapagos.Duels.FreeShop.ItemModelFreeShopItem");
    const isReady = getMethod(itemModelFreeShopItem, "get_isReady");
    isReady.implementation = function ()
    {
        return true;
    };
}