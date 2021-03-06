
export type DataTableSortCallback = (a: any, b: any) => number;

export class DataTableTranslations {
    indexColumn: string;
    selectColumn: string;
    expandColumn: string;
    paginationLimit: string;
    paginationRange: string;
}

export var defaultTranslations = <DataTableTranslations>{
    indexColumn: 'index',
    selectColumn: 'select',
    expandColumn: 'expand',
    paginationLimit: 'Limit',
    paginationRange: 'Results'
};


export class DataTableParams {
    offset?: number;
    limit?: number;
    sortBy?: string;
    customSort?: DataTableSortCallback;
    sortAsc?: boolean;
}
