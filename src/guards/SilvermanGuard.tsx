import { PATHS } from '@config/constants/paths';
import { useAppSelector } from '@redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function SilvermanGuard({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);
  if (Boolean(user?.result)) {
    return <Navigate to={PATHS.DASHBOARD.STUDENT.ROOT} replace />;
  }
  // else if (!Boolean(user?.result)) {
  //   return <Navigate to={PATHS.SECOND_STEP.SILVERMAN_QUESTIONS} replace />;
  // }

  return <>{children}</>;
}
