import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";
import { overrideBattleResult } from "@modifiers/battle_result";

export function registerBattleHooks(assembly: Il2Cpp.Image)
{
    logHook("battle hooks registered");
    overrideBattleResult(assembly);
}