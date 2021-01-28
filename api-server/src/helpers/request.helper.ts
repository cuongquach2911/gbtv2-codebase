export const failAction = async (request: any, h: any, err: any) => {
    console.log(err);
    throw err;
}
