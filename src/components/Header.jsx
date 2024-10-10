import React from 'react';
import DevlinksLogoLg from '../assets/DevlinksLogoLg';
import { PiFinnTheHumanLight } from "react-icons/pi";
import { FaLink, FaEye } from "react-icons/fa6"; // Simplified import for FaEye
import { useNavigate } from 'react-router-dom';

/**
 * Header component rendering the navigation bar with page options and preview button.
 * @param {Object} props - page: current page, setPage: function to set the active page.
 */
const Header = ({ page, setPage ,uid}) => {
    /**
     * Renders a navigation button with conditional styling
     * @param {string} pageName - Name of the page (e.g., 'links', 'profile')
     * @param {JSX.Element} Icon - Icon to display next to the page name
     * @param {string} label - Label to display for the button
     */
    const usenavigate = useNavigate()
    const renderNavButton = (pageName, Icon, label) => (
        <button
            className={`btn hover:text-white ${page === pageName ? 'text-[#FFF] bg-[#A5CDC4]' : 'bg-transparent'}`}
            onClick={() => setPage(pageName)}
        >
            <Icon className="text-xl" /> 
            <span className="hidden md:block">{label}</span> {/* Visible on larger screens */}
        </button>
    );

  
    
    return (
        <header className="flex items-center justify-between h-[70px] bg-white px-4 shadow rounded-md">
            {/* Large Logo visible on medium screens and above */}
            <div className="items-center hidden md:block">
                <DevlinksLogoLg />
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-4">
                {renderNavButton('links', FaLink, 'Links')}
                {renderNavButton('profile', PiFinnTheHumanLight, 'Profile Details')}
            </div>

            {/* Preview Button */}
            <button onClick={()=> usenavigate("/p/"+uid)} className="btn border-2 border-[#A5CDC4] text-[#A5CDC4] flex hover:text-white bg-white shadow-sm rounded-md">
                <FaEye className="text-xl" />
                <span className="hidden md:block">Preview</span>
            </button>
        </header>
    );
};

export default Header;
