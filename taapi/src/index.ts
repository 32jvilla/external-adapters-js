import { expose } from '@chainlink/ea-bootstrap'
import { execute } from './adapter'

const NAME = 'taapi'

export = { NAME, execute, ...expose(execute) }
