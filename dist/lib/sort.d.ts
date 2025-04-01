type OrderBy = 'asc' | 'desc';
export declare function sort<T>(arr: T[], orderBy?: OrderBy): T[];
export declare function sortWithKeys<T>(arr: T[], args: {
    [k: string]: OrderBy;
}): T[];
export {};
