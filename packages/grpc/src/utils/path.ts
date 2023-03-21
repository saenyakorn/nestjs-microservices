import { join } from 'path'

export function pathToProto(protoName: string): string {
  return join(__dirname, `../../proto/${protoName}.proto`)
}
