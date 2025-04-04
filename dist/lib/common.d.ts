export declare function cls(...args: (string | string[] | {
    [k: string]: any;
})[]): string;
export declare function delay(ms: number): Promise<void>;
export declare function debounce<T extends (...args: Parameters<T>) => any>(fn: T, ms: number): (...args: Parameters<T>) => Promise<ReturnType<T>>;
export declare function throttle<T extends (...args: Parameters<T>) => any>(fn: T, ms: number): (...args: Parameters<T>) => ReturnType<T>;
