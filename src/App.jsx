import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './routes/Layout'
import Login from './routes/Login'
import Home from './routes/Home'
import SignUp from './routes/SignUp'
import Notes from './routes/Notes'
import Note from './routes/Note'
import CreateNote from './routes/CreateNote'
import UserContextProvider from './components/UserContextProvider'
import RequireAuth from './components/RequireAuth'
import Error404 from './routes/Error404'
import EditNote from './routes/EditNote'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/home',
                element: (
                    <RequireAuth>
                        <Home />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes',
                element: (
                    <RequireAuth>
                        <Notes />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes/:id',
                element: (
                    <RequireAuth>
                        <Note />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes/newNote',
                element: (
                    <RequireAuth>
                        <CreateNote />
                    </RequireAuth>
                ),
            },
            {
                path: '/notes/:id/edit',
                element: (
                    <RequireAuth>
                        <EditNote />
                    </RequireAuth>
                ),
            },
            {
                path: '/*',
                element: <Error404 />,
            },
        ],
    },
])

export default function App() {
    return (
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    )
}
