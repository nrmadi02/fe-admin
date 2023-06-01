import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mock';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Sales from '../../sections/@dashboard/_sales/details';

// ----------------------------------------------------------------------

export default function SalesDetails() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const invoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Order Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Order',
              href: PATH_DASHBOARD.sales.root,
            },
            { name: invoice?.invoiceNumber || '' },
          ]}
        />

        <Sales sales={invoice} />
      </Container>
    </Page>
  );
}
