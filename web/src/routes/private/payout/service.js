export class AdminPayoutService {
    static getTotalRevenueShared = () => {
        return new Promise ((resolve, reject) => {
            setTimeout(()=> {
                resolve({
                    data: 99999
                })
            }, 1000);
        });
    }


    
}