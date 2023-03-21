let firstAttempt = true

beforeEach(() => {
  if (firstAttempt) throw new Error('Something went wrong')
})

afterEach(() => {
  if (firstAttempt) {
    firstAttempt = false
    throw new Error('Something went wrong')
  }
})

it(
  'Cypress repeats attempt lines when both beforeEach and afterEach fail',
  { retries: 2 },
  () => {}
)
