export const getPublicIp = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    return (await res.json()).ip;
 }