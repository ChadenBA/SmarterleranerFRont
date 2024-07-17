import { PrivateMessage } from '@redux/apis/messages/messagesApi.type'

export interface ChatProps {
  messages: PrivateMessage[]
  refetchMessages: () => void
  onlineUser: number[]
}
