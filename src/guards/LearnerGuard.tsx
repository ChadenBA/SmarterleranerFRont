import { PATHS } from '@config/constants/paths';
import { useAppSelector } from '@redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function LearnerGuard({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  if (Boolean(user?.coursesCount ?? 0 > 0)) {
    return <Navigate to={PATHS.DASHBOARD.STUDENT.ROOT} replace />;
  }

  return <>{children}</>;
}
