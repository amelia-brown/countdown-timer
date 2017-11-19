import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Mount from 'helpers/mount'

let renderComponent = Component => render(
  <AppContainer>
    <Component />
  </AppContainer>,
  document.getElementById('mount')
)

renderComponent(Mount)

if (module.hot) {
  module.hot.accept(Mount, () => {
    renderComponent(require('helpers/mount').default)
  })
}
