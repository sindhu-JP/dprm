import React from 'react';
// import Button from '@material-ui/core/Button';

import Slide from '@material-ui/core/Slide'; // import SearchBar from 'Features/360/Partner360/Financial/SearchBar';
// import NormalSearch from 'Components/TableSearch/NormalSearch';

import ContractCard from './contractCard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// () => history.push('/digital-prm-web-ui/suspension');
export default function PartnerList({ open, setOpen, item }) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}

      <ContractCard
        ContractType={'Master partner contract'}
        item={item}
        identifier={'partner'}
        SelectContractCard={{}}
        PartnerContracts={{}}
      />
    </div>
  );
}
