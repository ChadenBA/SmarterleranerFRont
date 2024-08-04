import { PATHS } from '@config/constants/paths';
import { useAppSelector } from '@redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function SilvermanGuard({ children }: { children: ReactNode }) {
  const user = useAppSelector((state) => state.auth.user);

  if (!user?.result) {
    const courseId = user?.latestCourseId;
    return (
      <Navigate
        to={{
          pathname: `${PATHS.SECOND_STEP.SILVERMAN_QUESTIONS}/${courseId}`,
        }}
        replace
      />
    );
  }

  return <>{children}</>;
}
