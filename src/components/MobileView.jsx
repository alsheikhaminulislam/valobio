import { FaArrowRight } from "react-icons/fa";

// MobileView Component displays user profile information and social media links.
const MobileView = ({ selectedImage, firstName, lastName, userEmail, linkItem }) => {
    // Helper function to render user information or skeleton placeholders
    const renderUserInfo = (data, skeletonClass) => {
        return data ? (
            <div className={`${skeletonClass} mt-2`}>{data}</div>
        ) : (
            <div className={`${skeletonClass} h-4 w-[160px] mt-2`}></div>
        );
    };

    return (
        <div className="flex-2 bg-white p-4 flex flex-col rounded-lg m-2 shadow-sm">
            <div className="mockup-phone justify-start items-center">
                <div className="camera"></div>
                <div className="display h-full">
                    <div className="artboard artboard-demo phone-1 bg-white align-top justify-start h-full">
                        {/* Profile Image */}
                        {selectedImage ? (
                            <img className="mask mask-circle mt-10 h-[100px]" src={selectedImage} alt="Profile" />
                        ) : (
                            <div className="skeleton h-[100px] w-[100px] shrink-0 rounded-full mt-10"></div>
                        )}

                        {/* User Name */}
                        {renderUserInfo(
                            `${firstName || ''} ${lastName || ''}`,
                            'font-bold text-[#8B8B8B]'
                        )} 

                        {/* User Email */}
                        {renderUserInfo(
                            userEmail,
                            'font-bold text-[#8B8B8B]/60 text-sm'
                        )}

                        {/* Social Media Buttons */}
                        {linkItem?.sort((a, b) => a.position - b.position).map((data, key) => (
                            <div
                                key={key}
                                className="mt-3 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3"
                                style={{ backgroundColor: data.color }} // Dynamic background color
                            >
                                <div className="flex items-center">
                                    {data.icon} {data.name}
                                </div>
                                <FaArrowRight className="text-xl" />
                            </div>
                        ))}

                        {/* Fill gaps if less than 5 items */}
                        {Array.from({ length: 5 - linkItem.length }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="mt-3 bg-gray-200 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3 skeleton"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileView;
