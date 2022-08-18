// import { useEffect, useState } from "react";
// import { useStateValue } from "../context/StateProvider";
// import { auth, firebaseapp } from "../lib/firebase";




// function useAuthListener() {
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
//     const [{ User }, dispatch] = useStateValue()

//     useEffect(() => {
//         const listener = auth.onAuthStateChanged((authUser) => {
//             // we have a user.. therefore we can store the user in localstorage
//             if (authUser) {
//                 dispatch({
//                     type : 'SET_USER',
//                     item : authUser
//                 })
//                 localStorage.setItem('authUser', JSON.stringify(authUser))
//                 setUser(authUser)
                
//             }
//             else {
//                 localStorage.removeItem('authUser');
//                 dispatch({
//                     type : 'SET_USER',
//                     item : null
//                 })
//                 setUser(null);

//             }
//         })

//         return () => listener(); //fires it once. no need to keep on calling the function again again
        
        

//     }, []);

//     return { user };
// }

// export default useAuthListener;
