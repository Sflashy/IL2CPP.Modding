import "frida-il2cpp-bridge";
import { logEntry, logInfo } from "@il2cpp/core/helpers/logger"
import { traceMethod, traceClass } from "@il2cpp/core/helpers/trace";
import { registerPlayerHooks } from "@hooks/player";
import { registerCurrencyHooks } from "@hooks/currency";

logEntry("il2cpp loaded");

Il2Cpp.perform(() => {
    
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    logEntry("assembly-csharp loaded");
    registerPlayerHooks(assembly);
    registerCurrencyHooks(assembly);

    assembly.class("ChapterResult").method(".ctor").implementation = function (...args : any)
    {
        console.log(args[8]);
        this.method(".ctor").invoke();
    }
    assembly.class("Enemy").method("Update").implementation = function ()
    {
        //this.method("ResumeMovement").invoke();
        this.method("Update").invoke();
    }
    assembly.class("AddCoinsDebug").method("Update").implementation = function () 
    {
        const debugMenu : Il2Cpp.Class = this.field("DebugMenu").value as unknown as Il2Cpp.Class;
        debugMenu.method("SetActive").invoke(true);

        logInfo("AddCoinsDebug.Update");
    };
    traceClass(assembly, ["AddCoinsDebug"], true);
    //traceAssembly("Assembly-CSharp", true);
});
