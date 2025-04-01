export declare function cls(...args: (undefined | string | string[] | {
    [k: string]: any;
})[]): string | undefined;
export declare function delay(ms: number): Promise<void>;
export declare function debounce<T extends (...args: Parameters<T>) => any>(fn: T, timeout?: number): (...args: Parameters<T>) => Promise<ReturnType<T>>;
export declare function throttle<T extends (...args: Parameters<T>) => any>(fn: T, timeout?: number): (...args: Parameters<T>) => ReturnType<T>;
