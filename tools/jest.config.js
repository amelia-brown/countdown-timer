const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-15')

Enzyme.configure({adapter: new Adapter()})

global.fetch = require('jest-fetch-mock')
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
}

