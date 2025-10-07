export default function createGenericManager<T extends object>(instance: T): T {
    return new Proxy(instance, {
        get(target, key) {
            if (key in target)
                return target[key as keyof T];
        },
        set(target, key, value) {
            if (key in target) {
                target[key as keyof T] = value;
                return true;
            }
            return false;
        }
    });
}