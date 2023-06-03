import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _sales } from 'src/_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import SalesNewEditForm from '../../sections/@dashboard/_sales/new-edit-form';

// ----------------------------------------------------------------------

export default function SalesEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const currentSales = _sales.find((sales) => sales.id === id);

  return (
    <Page title="Sales: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit sales"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Sales', href: PATH_DASHBOARD.sales.list },
            { name: currentSales?.SalesNumber || '' },
          ]}
        />

        <SalesNewEditForm isEdit currentsales={currentSales} />
      </Container>
    </Page>
  );
}
