import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SidebarStyles.less'

interface SidebarLinkComponentProps {
    lab: number;
}

const SidebarLink: React.FC<SidebarLinkComponentProps> = ({ lab }) => {
    const location = useLocation();

    return (
        <Link
            to={`lab${lab}`}
            className={`link ${location.pathname === `/lab${lab}` ? 'highlighted' : ''}`}
        >
            <div>
                <p>
                    {lab}
                </p>
            </div>
        </Link>
    )
}

const Sidebar: React.FC = () => {

    return (
        <div className='sidebar'>
            <SidebarLink lab={1} />
            <SidebarLink lab={2} />
        </div>
    );
};

export default Sidebar;