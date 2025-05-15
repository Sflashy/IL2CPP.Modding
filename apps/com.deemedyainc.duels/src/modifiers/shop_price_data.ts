import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overridePriceData(assembly: Il2Cpp.Image) {
    const priceData = getClass(assembly, "Galapagos.Duels.ItemModelComplexPriceData");
    const get_price = getMethod(priceData, "get_price");
    get_price.implementation = function ()
    {
        const price : any = this.method("get_price").invoke();
        price.field("isFree").value = true;
        return price;
    }
}