import { PATHS } from '@config/constants/paths';
import { useAppSelector } from '@redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function SubscriberGuard({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  if (!Boolean(user?.coursesCount ?? 0 <= 0)) {
    return <Navigate to={PATHS.SECOND_STEP.CATEGORIES} replace />;
  }

  return <>{children}</>;
}
