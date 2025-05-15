import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overridePriceData(assembly: Il2Cpp.Image) {
    const priceData = getClass(assembly, "Galapagos.Duels.ItemModelComplexPriceData");
    const get_price = getMethod(priceData, "get_price");
    const isIAP = getMethod(priceData, "get_isIAP");
    const isAds = getMethod(priceData, "get_isAds");
    const isCurrency = getMethod(priceData, "get_isCurrency");
    isCurrency.implementation = function ()
    {
        return false;
    }
    isAds.implementation = function ()
    {
        return false;
    }
    isIAP.implementation = function ()
    {
        return false;;
    }
    get_price.implementation = function ()
    {
        const price : any = this.method("get_price").invoke();
        price.field("isFree").value = true;
        return price;
    }
}