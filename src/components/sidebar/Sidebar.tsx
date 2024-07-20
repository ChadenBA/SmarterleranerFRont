import { SidebarTitle, StyledSidebarCard, StyledSidebarMenu } from './Sidebar.style';
import { useTranslation } from 'react-i18next';
import { SidebarItemsProps } from './SidebarItems.type';
import { UserRoleEnum } from '@config/enums/role.enum';
import { Logout, Settings } from '@mui/icons-material';
import { PATHS } from '@config/constants/paths';
import CustomSidebarLink from '@components/customLink/customSidebarLink/CustomSidebarLink';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { logout } from '@redux/slices/authSlice';
import { useLocation } from 'react-router-dom';

function Sidebar({ sidebarItem }: SidebarItemsProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user);
  return (
    <StyledSidebarCard>
      <SidebarTitle>{t('sidebar.dashboard')}</SidebarTitle>
      {sidebarItem
        .filter((item) => item.accessibleRoles?.includes(user?.role as UserRoleEnum))
        .map((item) => (
          <StyledSidebarMenu key={item.id}>
            <item.icon />
            <CustomSidebarLink
              to={item.path}
              label={t(item.label)}
              isActive={item.path === location.pathname}
            />
          </StyledSidebarMenu>
        ))}

      <SidebarTitle>{t('sidebar.account_settings')}</SidebarTitle>
      <StyledSidebarMenu>
        <Settings />
        <CustomSidebarLink
          to={PATHS.DASHBOARD.PROFILE.SETTINGS}
          label={t('sidebar.account_settings')}
          isActive={PATHS.DASHBOARD.PROFILE.SETTINGS === location.pathname}
        />
      </StyledSidebarMenu>
      <StyledSidebarMenu>
        <Logout />
        <CustomSidebarLink
          label={t('auth.logout')}
          isActive={false}
          to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`}
          onClick={() => {
            dispatch(logout());
          }}
        />
      </StyledSidebarMenu>
    </StyledSidebarCard>
  );
}

export default Sidebar;
