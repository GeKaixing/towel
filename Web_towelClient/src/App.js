import React from 'react'
import Routers from './router/Routers'
import Context from './store/Context'
export default function App() {
    return (
        <Context>
            <Routers />
        </Context>
    )
}
