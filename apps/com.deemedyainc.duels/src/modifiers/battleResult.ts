import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";
import { findObjectOfType } from "@il2cpp/core/helpers/unity";

/**
 * Overrides the implementation of the `Init` method in the `Galapagos.Duels.BattleController` class
 * to force the battle result to be true, immediately finish the battle, and load the menu scene.
 *
 * @param assembly - The Il2Cpp image containing the target classes and methods.
 *
 * This function:
 * - Hooks into the `Init` method of the battle controller.
 * - Sets the battle result to true.
 * - Calls the original `Init` and `FinishBattle` methods.
 * - Loads the menu scene using the `SceneLoader` class.
 */
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
        const sceneLoader : Il2Cpp.Object | null = findObjectOfType(assembly, "Galapagos.Duels.SceneLoader");
        sceneLoader?.method("LoadMenu").invoke();
    }
}