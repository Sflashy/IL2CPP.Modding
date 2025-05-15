import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideBattleResult(assembly: Il2Cpp.Image)
{
    const battleController = getClass(assembly, "Galapagos.Duels.BattleController");
    const init = getMethod(battleController, "Init");
    init.implementation = function(battleData: any, handler: any)
        {
            logHook("battle result overrided");
            battleData.field("result").value = true;
            this.method("Init").invoke(battleData, handler);
            this.method("FinishBattle").invoke();
        }
}