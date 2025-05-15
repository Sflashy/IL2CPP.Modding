import { logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { traceAssembly, traceNamespace } from "@il2cpp/core/helpers/trace";
import { overrideItemAvailability } from "@modifiers/free_shop_item";

export function registerShopHooks(assembly: Il2Cpp.Image)
{
    logInfo("shop hooks registered");
    // Override the availability of shop items
    overrideItemAvailability(assembly);
}