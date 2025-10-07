export default class GenericManager<T extends object> {

    /**対象のオブジェクト */
    private readonly instance: T;

    /**
     * コンストラクタ
     * @param instance 初期化値 
     */
    constructor(instance: T) {
        this.instance = instance;
    }

    get<k extends keyof T>(key: k): T[k] {
        return this.instance[key];
    }

    set<K extends keyof T>(key: K, value: T[K]): void {
        this.instance[key] = value;
    }
}