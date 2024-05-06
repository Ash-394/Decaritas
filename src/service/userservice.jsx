const BASE_URL = 'http://localhost:4000/users';

const userService = {
  login: async (email, password, walletAddress) => {
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
      console.log(walletAddress)
      const user = users.find(u => u.email === email && u.password === password && u.walletAddress === walletAddress );
      if (!user) {
        console.error('User does not exist');
      }
      return user;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  signup: async (email, password, walletAddress) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, walletAddress })
      });
      if (!response.ok) {
        throw new Error('Failed to register new user');
      }
      const newUser = await response.json();
      return newUser;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },
  getUserByWalletAddress: async (walletAddress) => {
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
      return users[0]; 
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
};

export default userService;