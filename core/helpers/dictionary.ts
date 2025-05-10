
export function iterate(dict: any)
{
    const keys = dict.field("Keys").value;
    const values = dict.field("Values").value;
    const count = keys.method("get_Count").invoke().value;
    for (let i = 0; i < count; i++) {
        const key = keys.method("get_Item").invoke(i);
        const value = values.method("get_Item").invoke(i);
        console.log(`${key.toString()} => ${value.toString()}`);
    }
}