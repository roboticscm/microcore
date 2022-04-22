export class AdminDashboardService {
    static getTotalActivedMembers = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(()=> {
                resolve({
                    data: 99999
                })
            }, 1000);
        });
    }


    static getTotalDeposited = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(()=> {
                resolve({
                    data: 77777
                })
            }, 2000);
        });
    }

    static getTotalPayout = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(()=> {
                resolve({
                    data: 888888
                })
            }, 5000);
        });
    }


    static getTotalRequestPayout = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(()=> {
                resolve({
                    data: 5555
                })
            }, 500);
        });
    }
}