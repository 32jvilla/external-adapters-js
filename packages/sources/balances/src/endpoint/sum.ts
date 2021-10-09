import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'

export const supportedEndpoints = ['sum', 'minMax']

type ResponseSchema = Array<{ address: string; balance: number }>

export const inputParameters: InputParameters = {}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)
  if (validator.error) throw validator.error
  const jobRunID = validator.validated.id

  const response = await Requester.request<ResponseSchema>(config.api)
  const result = response.data
    .map((wallet) => wallet.balance)
    .reduce(function (a, b) {
      return a + b
    })

  const minAddress = response.data.reduce(function (prev, curr) {
    return prev.balance < curr.balance ? prev : curr
  }).address
  const maxAddress = response.data.reduce(function (prev, curr) {
    return prev.balance > curr.balance ? prev : curr
  }).address
  console.log(minAddress, maxAddress)

  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
