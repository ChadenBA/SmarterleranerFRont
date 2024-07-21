import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '@redux/slices/authSlice';
import { PATHS } from '@config/constants/paths';
import { UserRoleEnum } from '@config/enums/role.enum';

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, user } = useSelector(selectAuth);

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          user?.role === UserRoleEnum.ADMIN
            ? PATHS.DASHBOARD.ADMIN.ROOT
            : user?.role === UserRoleEnum.USER
            ? PATHS.DASHBOARD.STUDENT.ROOT
            : PATHS.ROOT
        }
        replace
      />
    );
  }
  return <>{children}</>;
}
