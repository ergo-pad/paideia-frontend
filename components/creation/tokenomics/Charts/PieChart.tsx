import { Box } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import * as React from 'react';
import { ITokenHolder, ITokenomics } from '../../../../lib/creation/Api';
import { percentage } from '../../../../lib/creation/Utilities';
import { GlobalContext, IGlobalContext } from "../../../../lib/creation/Context";
import { LightTheme } from '../../../../theme/theme';

const PieChart: React.FC<ITokenomics> = (props) => {
    let globalContext = React.useContext<IGlobalContext>(GlobalContext);
    let data = props
    let tokenHolders = data.tokenHolders;
    return <ResponsivePie
    data={[{
        id: 'Token Holders',
        label: 'Token Holders',
        value: tokenHolders.map((i: ITokenHolder) => i.balance).reduce((sum, current) => sum + current, 0)
    }, {
        id: 'Unassigned Tokens',
        label: 'Unassigned Tokens (Treasury)',
        value: data.tokenRemaining
    }].concat(data.distributions.filter((i: any) => i !== undefined).map((i: any) => {
        return {
            id: i.distributionName,
            label: i.distributionName,
            value: i.balance
        }
    }))}
    colors={{'scheme': 'category10'}}
    valueFormat={(value) => `${value} (${percentage(value / data.tokenAmount, 0, true)})`}
    sortByValue
    margin={{ top: 40, right: 70, bottom: 30, left: 70 }}
    innerRadius={0.5}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                0.2
            ]
        ]
    }}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor={globalContext.api.theme === LightTheme ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'}
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{
        from: 'color',
        modifiers: [
            [
                'darker',
                3
            ]
        ]
    }}
/>
}


export default PieChart;