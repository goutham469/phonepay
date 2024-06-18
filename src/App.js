import './App.css';

// Landing page components
import Login from './components/HomePage.js/Login/Login';
import SignUp from './components/HomePage.js/SignUp/SignUp';

// User components
import Home from './components/User/Home/Home';
import Pay from './components/User/Pay/Pay';
import Recharge from './components/User/Recharge/Recharge';
// admin
import Admin from './components/Admin/AdminPage/Admin';

// Dependency libraries
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Login />
    },
    {
      path: 'signup',
      element: <SignUp />
    },
    {
      path: 'user',
      element: <Home />,
      children: [
        {
          path: '',
          element: <Pay />
        },
        {
          path: 'recharge',
          element: <Recharge />
        }
      ]
    },
    {
      path:'admin',
      element:<Admin/>
    }
  ]);

  console.log(store.getState());

  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
