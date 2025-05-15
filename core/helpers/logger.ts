
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN = '\x1b[36m';
const GRAY = '\x1b[90m';

function getTime(): string {
    return GRAY + new Date().toISOString().split("T")[1].split(".")[0] + RESET;
}

export function logInfo(msg: string): void {
    console.log(`[${getTime()}] ${GRAY}[INFO]${RESET} ${msg}`);
}

export function logWarn(msg: string): void {
    console.warn(`[${getTime()}] ${RED}[WARN]${RESET} ${msg}`);
}

export function logError(msg: string): void {
    console.error(`[${getTime()}] ${RED}[ERROR]${RESET} ${msg}`);
}

export function logTrace(msg: string): void {
    console.log(`[${getTime()}] ${GRAY}[TRACE]${RESET} ${msg}`);
}

export function logEntry(msg: string): void {
    console.log(`[${getTime()}] ${GREEN}[ENTRY]${RESET} ${msg}`);
}

export function logHook(msg: string): void {
    console.log(`[${getTime()}] ${GRAY}[HOOK]${RESET} ${msg}`);
}

export function logDictionary(dictInstance: Il2Cpp.Object) {
    const keys : any = dictInstance.method("get_Keys").invoke();
    const enumerator = keys.method("GetEnumerator").invoke();

    while (enumerator.method("MoveNext").invoke()) {
        const key = enumerator.method("get_Current").invoke();
        const value = dictInstance.method("get_Item").invoke(key);
        logInfo(`→ ${key}: ${value}`);
    }
}