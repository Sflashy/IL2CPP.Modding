import { logHook, logInfo } from "@il2cpp/core/helpers/logger";
import { getClass, getMethod } from "@il2cpp/core/helpers/resolver";
import { findObjectOfType } from "@il2cpp/core/helpers/unity";
import { overrideDifficulty } from "@modifiers/difficulty";
import { overrideGoalCount } from "@modifiers/goal";
import { overrideMoveCount } from "@modifiers/move";
import { overrideRewards } from "@modifiers/rewards";

export enum Difficulty {
    NOT_INITIALIZED = 0,
    VERY_EASY = 1,
    EASY = 2,
    MEDIUM = 3,
    HARD = 4,
    SUPER_HARD = 5,
}

/**
 * Registers all level hooks at once.
 *
 * @param assembly - The Il2Cpp.Image representing the game's assembly.
 */

export function registerLevelHooks(assembly: Il2Cpp.Image) {
    overrideDifficulty(assembly, Difficulty.SUPER_HARD);
    //overrideGoalCount(assembly, 0);
    //overrideMoveCount(assembly, 50);
    overrideRewards(assembly, 1000);
    instantlyCompleteLevel(assembly);
    increaseLevelOvertime(assembly);
    logHook("level hooks registered");
}


let levelInstance: any;
//ui change triggers this method | not implemented yet
function increaseLevelOvertime(assembly: Il2Cpp.Image) {
    const encryptedClass = getClass(assembly, "NBGJPOIEAHE");
    const encryptedMethod = getMethod(encryptedClass, "LMBGPFDCHIH");
    encryptedMethod.implementation = function (a,b)
    {
        this.method("LMBGPFDCHIH").invoke(a,b);
        let dialog : Il2Cpp.String = a as unknown as Il2Cpp.String;
        if(levelInstance == null || !dialog.content?.startsWith("WinDialog")) return;
        levelInstance.method("DKNIJNHDKDM").invoke();
    }
}

function instantlyCompleteLevel(assembly: Il2Cpp.Image) {
    const encryptedClass = getClass(assembly, "GONMKHLOBJO");
    const encryptedMethod = getMethod(encryptedClass, "Save");
    encryptedMethod.implementation = function (data : any) {
        //triggers win screen    
        levelInstance = this;
        this.method("BEOMCOEAOOC").invoke();
        this.method("OBIDBHGHODG").invoke();
        this.method("DKNIJNHDKDM").invoke();
        //THIS ONE IS LEVEL DO NOT PASS THE 10551
        //this.field("CKINCJLGCPG").value = 10549;
        const caravanTopLevel = this.field("EEOHMEMMHIA").value as unknown as Il2Cpp.Class;
        caravanTopLevel.method("StopLast5Moves").invoke();
            
        //show directly win screen (this breaks the game, the hooks above are working fine though)
        //this.method("FPKINMDGIEK").invoke();
        //this.method("EOMMIFOFDNN").invoke();
    }
/*       encryptedClass.method("FPKINMDGIEK").implementation = function () 
    {
        this.field("FBAJPLDPADC").value = 500;
        this.field("PKAEBHDBOEP").value = 500;
        this.field("CHADCIIJEJD").value = 500;
        this.field("OMAJCOLBAFE").value = 500;
        this.field("JOOJJJPFHNE").value = 500;
        this.field("KMNKIPFCPMK").value = 500;
        this.field("MFDGABBCBOE").value = 500;
        this.field("ECPABEPNBBK").value = 500;
        this.field("OBCPBLOGGPL").value = 500;
        this.field("AEGJGJBHLCA").value = 500;
        this.field("LFLPHMHPAMP").value = 500;
        this.method("FPKINMDGIEK").invoke();
        logInfo("DKNIJNHDKDM");
    }  */ 
}

