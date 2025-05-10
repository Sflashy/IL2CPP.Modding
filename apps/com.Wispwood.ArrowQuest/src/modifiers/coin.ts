import { logHook } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";

export function overrideCoinReceive(assembly: Il2Cpp.Image, amount: number) {
    logHook("Coin receive hook registered");
    const coinManager = getClass(assembly, "PlayerData");
    const addCoin = getMethod(coinManager, "AddCoins");
    addCoin.implementation = function (_amount: any)
    {
        logHook(`Coin: ${_amount} → ${amount}`);
        this.method("AddCoins").invoke(amount);
    }
}

