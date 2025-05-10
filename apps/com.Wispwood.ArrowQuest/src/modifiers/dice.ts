import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideDiceReceive(assembly: Il2Cpp.Image, amount: number) {
    logHook("Dice receive hook registered");
    const diceManager = getClass(assembly, "PlayerData");
    const addDice = getMethod(diceManager, "AddDices");
    addDice.implementation = function (_amount: any, source: any)
    {
        logHook(`Dice: ${_amount} → ${amount}`);
        this.method("AddDices").invoke(amount, source);
    }
}