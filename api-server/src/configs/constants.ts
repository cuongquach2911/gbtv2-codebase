export const pagerVaribles = {
    skipCalculate: (page: number) => {
        return  Math.min(0, page -1) * pagerVaribles.pageSize;
    },
    pageSize: 20
};
