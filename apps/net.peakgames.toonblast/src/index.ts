import "frida-il2cpp-bridge";
import { logEntry, logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { hookMethod, traceAssembly, traceClass, traceMethod } from "@il2cpp/core/helpers/trace";
import { registerLevelHooks } from "@hooks/level";
import { registerShopHooks } from "@hooks/shop";

logEntry("il2cpp loaded");

Il2Cpp.perform(() => {
    const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    const facebookUnity = Il2Cpp.domain.assembly("Facebook.Unity").image;

    logEntry("assembly-csharp loaded");

    //hooks go here
    registerLevelHooks(assembly);
    registerShopHooks(assembly);
    
    //traceClass(assembly, ["ChestItem","ADBPCPIPPJN", "MapScene.RewardItem", "LMIAPNDJMKO", "Assets.Scripts.Utils.Analytics.JsonGift", "JHLOHAFBKNM", "PKGBGGMGFME", "Dialogs.Offers.Shop.ShopOfferRewardDisplay"], true);
    traceClass(assembly, ["MJJBHPGMDCO"], true);

});
