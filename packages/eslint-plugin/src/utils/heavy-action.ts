import { createSyncFn } from 'synckit'
import type { run } from './worker'

const heavyAction = createSyncFn(require.resolve('./worker'), {
    tsRunner: 'swc'
}) as typeof run

export default heavyAction