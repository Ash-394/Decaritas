
const UseWallet = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            return accounts[0];

        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        console.error('MetaMask extension not detected');
    }
};


export default UseWallet;
