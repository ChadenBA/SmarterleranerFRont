import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import noUser from '@assets/images/noUser.png'
import {
  useGetFacilitatorsChatQuery,
  useGetUsersChatQuery,
} from '@redux/apis/messages/messagesApi'
import { UserRoleEnum } from '@config/enums/role.enum'
import PrivateChat from '@components/privateChat/PrivateChat'
import { useAppSelector } from '@redux/hooks'
import { usePrivateMessage } from 'src/hooks/usePrivateMessage'

function Chat() {
  const { data: facilitatorData } = useGetFacilitatorsChatQuery()
  const facilitators = facilitatorData?.data

  const { data: usersData } = useGetUsersChatQuery()
  const users = usersData?.data

  const user = getUserFromLocalStorage()
  const authUserId = useAppSelector((state) => state.auth.user?.id)
  const { messages, onlineUser, refetchMessages } =
    usePrivateMessage(authUserId)

  return (
    <PrivateChat
      messages={messages}
      refetchMessages={refetchMessages}
      onlineUser={onlineUser}
      users={
        user?.role === UserRoleEnum.USER ? facilitators || [] : users || []
      }
      authUserId={user?.id || 0}
      authUserImage={user?.media?.fileName || noUser}
    />
  )
}

export default Chat
