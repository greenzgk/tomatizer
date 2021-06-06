export type ActionType = 'start' | 'stop'

export interface WorkerMessage {
  action: ActionType
  timeout?: number
  interval?: number
}
