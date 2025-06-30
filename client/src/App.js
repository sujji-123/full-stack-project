import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import User from './getUser/User';
import './index.css';
import AddUser from './addUser/addUser';

import UpdateUser from './updateUser/Update';

function App() {
  const route = createBrowserRouter([
   { path: '/',
     element: <User />,
   },
   {
    path: "/add",
    element: <AddUser />,
   },
   {
    path: "/update/:id",
    element: <UpdateUser />,
   }
  ])
  return (
    <div className="App">
      <RouterProvider router={route}>

      </RouterProvider>


    </div>
  );
}

export default App;
