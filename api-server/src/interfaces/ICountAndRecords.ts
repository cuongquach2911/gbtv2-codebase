export interface ICountAndRecords {
    statusCode: number;
    message?: string;
    data: {
        count: number,
        rows: any;
    }
};
