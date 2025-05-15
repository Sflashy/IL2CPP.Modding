import { logInfo } from "@il2cpp/core/helpers/logger";

export function fromString(assembly: Il2Cpp.Image , jsonString: string): any 
{
    logInfo("converting string to hash");
    return assembly.class("Galapagos.Json.Hash").method("FromString").invoke(Il2Cpp.string(jsonString));
}

export function toString(assembly: Il2Cpp.Image , hash: any): any 
{
    logInfo("converting hash to string");
    return assembly.class("Galapagos.Json.Hash").method("ToString").invoke(hash);
}