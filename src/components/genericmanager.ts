export function createGenericManager<T extends object>(instance: T): T;
export function createGenericManager<T>(instance: T): T;
export function createGenericManager<T>(instance: T): T {
    if (typeof instance === "object" && instance !== null)
        return new Proxy(instance, {
            get: Reflect.get,
            set: Reflect.set,
        }) as T;
    return instance;
}


export default createGenericManager;