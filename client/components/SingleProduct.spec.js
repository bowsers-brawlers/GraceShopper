import 'jsdom-global/register'
import React from 'react'
import {expect} from 'chai'
import {shallow, mount} from 'enzyme'
import {Provider} from 'react-redux'
import store from '../store'
import SingleProduct from './SingleProduct'
// import Adapter from 'enzyme-adapter-react-16'
// //import {shallow} from 'enzyme'

// // const adapter = new Adapter()
// // enzyme.configure({adapter})

xdescribe('Single Product Component', () => {
  const powderedWine = {
    id: 2,
    name: 'powdered Wine',
    description: 'testing the powdered wine description',
    price: 1.99,
    quantity: 100,
    imageUrl: 'fakepowderedWineUrl.com'
  }

  let wrapper

  const sampleWine = {
    id: 1,
    name: 'sampleWine',
    description: 'testing sampleWine description',
    price: 101.99,
    quantity: 3,
    imageUrl: 'fakeUrl.com'
  }

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <SingleProduct singleProduct={sampleWine} />
      </Provider>
    )
  })

  it('renders the wine name, description, price, quantity and photo', () => {
    //  wrapper =mount(<SingleProduct pet={sampleWine} />)
    console.log(wrapper)
    expect(wrapper.text()).to.include('sampleWine')
    expect(wrapper).to.include.string('testing sampleWine description')
    expect(wrapper).to.include.float(101.99)
    expect(wrapper).to.include.integer(3)
  })
  xit('renders different name, description, and species if passed different props', () => {
    //const wrapper = mount(<SingleProduct pet={powderedWine} />)
    expect(wrapper).to.include.text('powdered Wine')
    expect(wrapper).to.include.text('testing the powdered wine description')
    expect(wrapper).to.include.float(1.99)
    expect(wrapper).to.include.integer(100)
  })
})

// describe('Visit component', (assert) => {
//   const sampleWine = {
//     id: 1,
//     name: 'sampleWine',
//     description: 'testing sampleWine description',
//     price: 101.99,
//     quantity: 3,
//     imageUrl: 'fakeUrl.com',
//   }
//   const powderedWine = {
//     id: 2,
//     name: 'powdered Wine',
//     description: 'testing the powdered wine description',
//     price: 1.99,
//     quantity: 100,
//     imageUrl: 'fakepowderedWineUrl.com',
//   }
//   const component = shallow(<SingleProduct visited={powderedWine} />)
//   const wrapper = mount(<SingleProduct />)

//   assert.equal(
//     component.find('span').text(),
//     '',
//     'the visit component has no text'
//   )

//   assert.pass(expect(wrapper.ref('visit').prop('visited')).to.equal(false))
//   assert.end()
// })
