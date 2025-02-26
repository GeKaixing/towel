import React from 'react'
import Routers from './router/Routers'
import Context from './store/Context'
import AddContent from './view/body/addComponents/AddContent'
export default function App(): React.ReactElement {
    return (
        <Context>
            <AddContent></AddContent>
            <Routers />
        </Context>
    )
}
