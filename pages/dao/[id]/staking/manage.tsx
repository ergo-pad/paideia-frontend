import Layout from '@components/dao/Layout';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Header, Subtitle } from '@components/creation/utilities/HeaderComponents';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StakingForm from '@components/dao/staking/StakingForm'
import WithdrawForm from '@components/dao/staking/WithdrawForm';

interface ITokenBanner {
    amount: string,
    ticker: string
}

const TokenBanner: React.FC<ITokenBanner> = (props) => {
    return <Box sx={{width: '100%', backgroundColor: 'fileInput.outer', display: 'flex', alignItems: 'center', fontSize: '1.3rem', fontWeight: 500, color: 'text.main', border: '1px solid', borderColor: 'divider.main', p: '1rem', borderRadius: '.3rem', mt: '1rem', pt: '.5rem', pb: '.5rem'}}>
        {props.amount}
        <Box sx={{ml: 'auto', color: 'text.light', fontSize: '.9rem', fontWeight: 500}}>
            {`${props.ticker.toUpperCase()} tokens staked`}
        </Box>
    </Box>
}

const ManageStake: React.FC = () => {
    const tabStyle = {pl: 0, pr: 0}
    const [value, setValue] = React.useState('Stake Tokens');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
    const router = useRouter();
    const {id} = router.query;
    return <Layout width='65%'>
        <Link href={`/dao/${id}/staking`}>
            <Button variant="outlined" size='small' sx={{mb: '1rem'}}>
              <ArrowBackIcon
                sx={{ mr: ".5rem", fontSize: '1.1rem' }}
                color="primary"
              />
              Back
            </Button>
          </Link>
          <Header title='Manage your staked tokens' large/>
          <TokenBanner amount={'32,661'} ticker='DTK'/>
          <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider.main', mt: '1.5rem' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Stake Tokens" value="Stake Tokens" />
            <Tab label="Withdraw Tokens" value="Withdraw Tokens" />
          </TabList>
        </Box>
        <TabPanel value="Stake Tokens" sx={tabStyle}>
            <StakingForm/>
        </TabPanel>
        <TabPanel value="Withdraw Tokens" sx={tabStyle}>
            <WithdrawForm/>
        </TabPanel>
      </TabContext>

    </Layout >
}

export default ManageStake;