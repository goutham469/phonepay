const initialState = {
    signed: false,
    userEmail: ''
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case "login":
        const now = new Date();
        const expireTime = now.getTime() + 600 * 1000; // 600 x 1000 milliseconds = 600 seconds
        now.setTime(expireTime);
  
        document.cookie = `userEmail=${action.userEmail}; expires=${now.toUTCString()}; path=/;`;
  
        return { ...state, signed: true, userEmail: action.userEmail };
      case "logout":
        document.cookie = "userEmail=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
        return { ...state, signed: false, userEmail: '' };
      default:
        return state;
    }
  }
  
  export default reducer;
  