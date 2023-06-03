import PropTypes from 'prop-types';

// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button, MenuItem } from '@mui/material';
import { RHFSelect } from '../../../../components/hook-form';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useToggle from '../../../../hooks/useToggle';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
//
import InvoiceAddressListDialog from './SalesAddressListDialog';


// ----------------------------------------------------------------------

const SERVICE_OPTIONS = ['Jasa', 'Item', 'Charge', 'FA'];

export default function InvoiceNewEditAddress() {

  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { toggle: openFrom, onOpen: onOpenFrom, onClose: onCloseFrom } = useToggle();

  const { toggle: openTo, onOpen: onOpenTo, onClose: onCloseTo } = useToggle();

  const { invoiceFrom, invoiceTo } = values;

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            From:
          </Typography>

          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onOpenFrom}>
            Change
          </Button>

          <InvoiceAddressListDialog
            open={openFrom}
            onClose={onCloseFrom}
            selected={(selectedId) => invoiceFrom?.id === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={_invoiceAddressFrom}
          />
        </Stack>

        <AddressInfo name={invoiceFrom.name} address={invoiceFrom.address} phone={invoiceFrom.phone} />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack width="100%" spacing={3} direction="column" alignItems="center" justifyContent="end" sx={{ mb: 1 }}>
          <Stack width="100%" spacing={3} direction="row" justifyContent="end" alignItems="center">
            <p>Select 1</p>
            <RHFSelect
              name={`item.2`}
              label="Service type"
              size="small"
              InputLabelProps={{ shrink: true }}
              SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              sx={{ maxWidth: { md: 160 } }}
            >
              <MenuItem
                value=""
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  fontStyle: 'italic',
                  color: 'text.secondary',
                }}
              >
                None
              </MenuItem>
              <Divider />
              {SERVICE_OPTIONS.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
          <Stack width="100%" spacing={3} direction="row" justifyContent="end" alignItems="center">
            <p>Select 1</p>
            <RHFSelect
              name={`item.2`}
              label="Service type"
              size="small"
              InputLabelProps={{ shrink: true }}
              SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              sx={{ maxWidth: { md: 160 } }}
            >
              <MenuItem
                value=""
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: 'body2',
                  fontStyle: 'italic',
                  color: 'text.secondary',
                }}
              >
                None
              </MenuItem>
              <Divider />
              {SERVICE_OPTIONS.map((option) => (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: 0.75,
                    typography: 'body2',
                    textTransform: 'capitalize',
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </RHFSelect>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

function AddressInfo({ name, address, phone }) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography>
    </>
  );
}
