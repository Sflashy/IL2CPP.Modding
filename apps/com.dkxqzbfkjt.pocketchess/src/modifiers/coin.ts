import { logHook } from "@il2cpp/core/helpers/logger";

export function overrideCoins(assembly: Il2Cpp.Image) {
    assembly.class("GameContext").method("set_isNoAds").implementation = function () {
        logHook("overriding coins");
        this.method("ReplaceCoins").invoke(640509);
    }
}