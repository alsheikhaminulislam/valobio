import React, { useState } from 'react';
import { TbMenu } from "react-icons/tb";
import { iconMap } from '../assets/Logo'; // Assuming iconMap contains platform icons and names

/**
 * Component that renders a list of items and allows selecting platforms for links
 * @param {Object} props - data: link data, i: index, LinkItem: function to update link items
 */
const ItemListLayout = ({ data, i, LinkItem }) => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility

    /**
     * Toggle the dropdown visibility
     */
    const toggleDropdown = () => {
        setIsOpen((prevState) => !prevState);
    };

    /**
     * Handle platform selection from dropdown, update the respective link item
     * @param {JSX.Element} platformIcon - Icon for the platform
     * @param {string} platformName - Name of the platform
     * @param {string} color - Color associated with the platform
     */
    const handlePlatformSelect = (platformIcon, platformName, color) => {
        setIsOpen(false);
        updateLinkItem({ icon: platformIcon, name: platformName, color });
    };

    /**
     * Update the specific link item at index `i` with new platform details
     * @param {Object} updatedFields - Fields to update (icon, name, color, etc.)
     */
    const updateLinkItem = (updatedFields) => {
        LinkItem((prevItems) =>
            prevItems.map((item, index) =>
                index === i ? { ...item, ...updatedFields } : item
            )
        );
    };

    return (
        <div className="relative w-full mb-2"
            onClick={toggleDropdown}>
            {/* Input Label */}
            <label className="form-control w-full">
                <span className="label-text text-[#6D6D6D]">Platform</span>
            </label>

            {/* Button to toggle dropdown */}
            <button
                className="w-full bg-white border border-[#D4D4D4] text-[#8B8B8B] py-2 px-4 rounded-md flex items-center justify-between"
            >
                <span className="flex items-center">
                    {data.icon} {data.name} {/* Display selected platform */}
                </span>
                <TbMenu className="ml-2" /> {/* Menu icon for dropdown */}
            </button>

            {/* Dropdown menu for platform selection */}
            {isOpen && (
                <ul className="absolute w-full bg-white shadow-lg mt-1 rounded-md z-10"
                
            onClick={toggleDropdown}>
                    {iconMap.map((platform, key) => (
                        <li
                            key={key}
                            onClick={() => handlePlatformSelect(platform.icon, platform.name, platform.color)}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {platform.icon} {platform.name} {/* Display platform options */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItemListLayout;
