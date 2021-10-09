import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'
// import { NAME as AdapterName } from '../config'

export const supportedEndpoints = ['sum']

export const endpointResultPaths = {
  example: 'price',
}

export interface ResponseSchema {
  data: Array<{
    address: string
    balance: number
  }>
  result: number
}

export const inputParameters: InputParameters = {}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)
  if (validator.error) throw validator.error
  // const resultPath = validator.validated.data.resultPath

  const jobRunID = validator.validated.id
  const response = await Requester.request(config.api)

  const result = response.data
    .map((wallet: { address: string; balance: number }) => wallet.balance)
    .reduce(function (a: number, b: number) {
      return a + b
    })
  console.log(result)

  // response.data = Requester.validateResultNumber(response.data, [
  //   'address',
  //   'balance',
  // ])

  // return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
  return Requester.success(jobRunID, response, config.verbose)
}
