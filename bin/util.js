module.exports = {
    formatResponse: async (rows) => {
        let data = {
            open_tasks:0,
            inprogress_tasks:0,
            completed_tasks:0
        };
        for(let row of rows) {
            if(row.status.toLowerCase() === 'open' ) {
                data.open_tasks = row.totalCount;
            } else if(row.status.toLowerCase() === 'close') {
                data.completed_tasks = row.totalCount;
            } else if(row.status.toLowerCase() === 'continue') {
                data.inprogress_tasks = row.totalCount;
            }
        }
        return data;
    },

    isValidStatus: async(status="") => {
        const allStatus = ['open', 'close', 'continue'];
        return allStatus.includes(status.toLowerCase());
    }
}