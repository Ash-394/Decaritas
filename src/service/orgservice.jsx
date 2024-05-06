const BASE_URL = 'http://localhost:4000/organisation';

const orgService = {
  login: async (email, password, orgId, walletAddress) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const users = await response.json();
      
      const user = users.find(u => u.email === email && u.password === password && u.orgId === orgId && u.walletAddress === walletAddress );
      
      if (!user) {
        console.error('Organisation does not exist');
      }
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  getOrgByWalletAddress: async (walletAddress) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const users = await response.json();
      const user = users.find(u => u.walletAddress === walletAddress );
      return user;  
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
};

export default orgService;