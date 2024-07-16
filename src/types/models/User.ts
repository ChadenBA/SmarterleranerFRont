import { UserRoleEnum } from '@config/enums/role.enum'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRoleEnum
  birthDate: string
  major : string
  coursesCount?: number
  isValid?: 0 | 1
  media?: {
    modelId: number
    fileName: string
  }[]
  createdAt?: string
  password?: string
  passwordConfirmation?: string
}
