import "frida-il2cpp-bridge";
import { findObjectOfType } from "@il2cpp/core/helpers/unity";
import { logEntry, logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { hookMethod, traceAssembly, traceClass, traceMethod } from "@il2cpp/core/helpers/trace";
import { registerLevelHooks } from "@hooks/level";
import { registerShopHooks } from "@hooks/shop";

logEntry("il2cpp loaded");

setTimeout(() => {

    Il2Cpp.perform(() => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    logEntry("assembly-csharp loaded");

    //hooks go here
    registerLevelHooks(assembly);
    registerShopHooks(assembly);
});


}, 5000);


/* Il2Cpp.perform(() => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    logEntry("assembly-csharp loaded");

    //hooks go here
    registerLevelHooks(assembly);
    registerShopHooks(assembly);
});
 */