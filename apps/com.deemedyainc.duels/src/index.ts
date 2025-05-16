import "frida-il2cpp-bridge";
import { logEntry, logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { registerShopHooks } from "@hooks/shop";
import { registerBattleHooks } from "@hooks/battle";

logEntry("il2cpp loaded");


setTimeout(() => {
Il2Cpp.perform(() => {
    
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    logEntry("assembly-csharp loaded");

    // Register hooks
    registerShopHooks(assembly);
    registerBattleHooks(assembly);
});
}, 5000);
