import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideRubyReceive(assembly: Il2Cpp.Image, amount: number) {
    logHook("Ruby receive hook registered");
    const rubyManager = getClass(assembly, "PlayerData");
    const addRuby = getMethod(rubyManager, "AddRubies");
    addRuby.implementation = function (_amount: any, source : any)
    {
        logHook(`Ruby: ${_amount} → ${amount}`);
        this.method("AddRubies").invoke(amount, source);
    }
}