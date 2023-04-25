import React from 'react';
import Getinfopage from './Getinfopage';
import MonthlyClientCountsChart from './ManagerChart';
function ManagerSection() {
    return (
        <div className='managerSecin'>
            <Getinfopage />
            <MonthlyClientCountsChart />
        </div>
    );
}

export default ManagerSection;