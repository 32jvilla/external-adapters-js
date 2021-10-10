import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/types'

export const supportedEndpoints = ['minMax']

type ResponseSchema = Array<{ address: string; balance: number }>

export const inputParameters: InputParameters = { min: false }

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)
  if (validator.error) throw validator.error
  const jobRunID = validator.validated.id
  const min = validator.validated.data.min ?? true

  const response = await Requester.request<ResponseSchema>(config.api)
  const result = min
    ? response.data.reduce(function (prev, curr) {
        return prev.balance < curr.balance ? prev : curr
      }).address
    : response.data.reduce(function (prev, curr) {
        return prev.balance > curr.balance ? prev : curr
      }).address

  return Requester.success(jobRunID, Requester.withResult(response, result), config.verbose)
}
