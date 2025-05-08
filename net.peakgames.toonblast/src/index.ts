import "frida-il2cpp-bridge";

import { registerLevelHooks } from "@hooks/level";
import { logEntry } from "@helpers/logger";

logEntry("il2cpp loaded");

Il2Cpp.perform(() => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

    logEntry("assembly-csharp loaded");
    registerLevelHooks(assembly);
});