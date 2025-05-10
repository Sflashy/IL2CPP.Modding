import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";
import { overrideDamageReceive } from "modifiers/damage";


export function registerPlayerHooks(assembly: Il2Cpp.Image) {
    logHook("Player hooks registered")
    overrideDamageReceive(assembly, 0);
    purchaseAllPacks(assembly);
}

function purchaseAllPacks(assembly: Il2Cpp.Image) {
    const playerData = getClass(assembly, "PlayerData");
    const constructor = getMethod(playerData, ".ctor");
    constructor.implementation = function () {
        logHook("Purchased all packs");
        this.method(".ctor").invoke();
        this.field("hasChapterPassA").value = true;
        this.field("hasChapterPassB").value = true;
        this.field("hasChapterPassC").value = true;
        this.field("hasChapterPassD").value = true;
        this.field("hasChapterPassE").value = true;
        this.field("hasChapterPassF").value = true;
        this.field("adsRemoved").value = true;
    }
}