import "frida-il2cpp-bridge";
import { logEntry, logHook } from "@il2cpp/core/helpers/logger";

logEntry("il2cpp loaded");

Il2Cpp.perform(() => {
    
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    logEntry("assembly-csharp loaded");


});