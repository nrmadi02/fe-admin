import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../sections/@dashboard/_item/ItemNewEditForm';
import { Item } from 'framer-motion/types/components/Reorder/Item';

// ----------------------------------------------------------------------

export default function ItemCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { item } = useSelector((state) => state.item);
  const isEdit = pathname.includes('edit');
  const currentItem = Item.find((item) => paramCase(item.name) === name);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Create a new item">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new item' : 'Edit item'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.item.root,
            },
            { name: !isEdit ? 'New product' : name },
          ]}
        />

        <ItemNewEditForm isEdit={isEdit} currentItem={currentItem} />
      </Container>
    </Page>
  );
}
