// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import SalesNewEditForm from '../../sections/@dashboard/_sales/new-edit-form';

// ----------------------------------------------------------------------

export default function SalesCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Sales: Create a new Order">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Order"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Sales', href: PATH_DASHBOARD.sales.list },
            { name: 'New Sales' },
          ]}
        />

        <SalesNewEditForm />
      </Container>
    </Page>
  );
}
