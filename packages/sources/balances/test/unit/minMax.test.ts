import { assertSuccess, assertError } from '@chainlink/ea-test-helpers'
import { AdapterRequest } from '@chainlink/types'
import { makeExecute } from '../../src/adapter'
import { Requester } from '@chainlink/ea-bootstrap'

describe('execute', () => {
  const jobID = '1'
  const execute = makeExecute()

  describe('successful calls', () => {
    const requests = [
      {
        name: 'no endpoint specified',
        testData: {
          id: jobID,
          data: {},
        },
      },
      {
        name: 'no minOrMax specified',
        testData: {
          id: jobID,
          data: {
            endpoint: 'minMax',
          },
        },
      },
      {
        name: 'no id specified',
        testData: {
          data: {
            endpoint: 'minMax',
            min: true,
          },
        },
      },
    ]

    requests.forEach((req) => {
      it(`${req.name}`, async () => {
        const data = await execute(req.testData as AdapterRequest)
        assertSuccess({ expected: 200, actual: data.statusCode }, data, jobID)
      })
    })
  })

  describe('validation error', () => {
    const requests = [
      { name: 'empty body', testData: {} },
      { name: 'empty data', testData: { data: {} } },
      {
        name: 'minOrMax arg is an int',
        testData: {
          data: {
            endpoint: 'minMax',
            min: 3,
          },
        },
      },
    ]

    requests.forEach((req) => {
      it(`${req.name}`, async () => {
        try {
          await execute(req.testData as AdapterRequest)
        } catch (error) {
          const errorResp = Requester.errored(jobID, error)
          assertError({ expected: 400, actual: errorResp.statusCode }, errorResp, jobID)
        }
      })
    })
  })
})
