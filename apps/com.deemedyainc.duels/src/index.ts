import "frida-il2cpp-bridge";
import { logEntry, logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { traceAssembly, traceClass, traceMethod, traceNamespace } from "@il2cpp/core/helpers/trace";
import { registerShopHooks } from "@hooks/shop";

logEntry("il2cpp loaded");

Il2Cpp.perform(() => {
    
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    logEntry("assembly-csharp loaded");

    // Register hooks
    registerShopHooks(assembly);
});
