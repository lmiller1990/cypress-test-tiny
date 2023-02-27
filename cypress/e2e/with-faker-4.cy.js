import { faker } from '@faker-js/faker';

describe('page', () => {
  it('works', () => {
    const randomName = faker.name.fullName(); 

    expect(randomName).to.eq(randomName)
  })
})
