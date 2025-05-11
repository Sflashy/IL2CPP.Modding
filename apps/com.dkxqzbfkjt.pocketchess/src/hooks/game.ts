import { logHook } from "@il2cpp/core/helpers/logger";
import { overrideCoins } from "@modifiers/coin";


export function registerGameHooks(assembly: Il2Cpp.Image) {
    logHook("game hooks registered");
    removeAds(assembly);
    overrideCoins(assembly);
}

function removeAds(assembly: Il2Cpp.Image) {
    logHook("removing ads");
    assembly.class("GameContext").method("get_isNoAds").implementation = () => true;
}