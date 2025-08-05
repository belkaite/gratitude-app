import { Chance } from 'chance'
const random = Chance()

export const fakeUser = () => ({
  email: random.email(),
  password: 'superstrongpassaleliuja200**',
  firstName: random.first(),
  lastName: random.last(),
})
