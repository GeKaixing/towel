import { View, Text } from 'react-native'
import React from 'react'
import { store } from './store/store'
import { Provider } from 'react-redux'
import IndexRouter from './router/indexRouter'
import { Providers } from './context/context'
export default function App() {
  return (
    <Providers>
      <Provider store={store}>
        <IndexRouter></IndexRouter>
      </Provider>
    </Providers>

  )
}