import { logHook } from "@il2cpp/core/helpers/logger";
import { overrideCoinReceive } from "modifiers/coin";
import { overrideDiceReceive } from "modifiers/dice";
import { overrideRubyReceive } from "modifiers/ruby";

export function registerCurrencyHooks(assembly: Il2Cpp.Image) {
    logHook("Currency hooks registered")
    overrideCoinReceive(assembly, Number.MAX_SAFE_INTEGER);
    overrideRubyReceive(assembly, Number.MAX_SAFE_INTEGER);
    overrideDiceReceive(assembly, Number.MAX_SAFE_INTEGER);
}