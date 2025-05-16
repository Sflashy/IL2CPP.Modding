import { logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { traceAssembly, traceNamespace } from "@il2cpp/core/helpers/trace";
import { overrideItemAvailability } from "@modifiers/shopItems";
import { overridePriceData } from "@modifiers/priceData";

export function registerShopHooks(assembly: Il2Cpp.Image)
{
    logHook("shop hooks registered");
    // Override the availability of shop items
    overrideItemAvailability(assembly);
    overridePriceData(assembly);
}