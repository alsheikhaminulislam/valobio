import { FaPhotoVideo } from "react-icons/fa";

/**
 * ProfilePage component for handling user profile updates, including image uploads
 * and user information input fields.
 * @param {Object} props - Props include selectedImage, removeImage, setFirstName, setLastName, setUserEmail,
 *                         firstName, lastName, userEmail, handleImageChange, SaveProfile.
 */
const ProfilePage = ({
    selectedImage,
    removeImage,
    setFirstName,
    setLastName,
    setUserEmail,
    firstName,
    lastName,
    userEmail,
    handleImageChange,
    saveProfile,
}) => {

    /**
     * Renders the input fields for the profile details.
     * @param {string} label - Label for the input field
     * @param {string} value - Value of the input field (firstName, lastName, or userEmail)
     * @param {Function} onChange - Handler function to update the state on input change
     * @param {string} type - Input field type (text or email)
     */
    const renderInputField = (label, value, onChange, type = "text") => (
        <label className="form-control w-full max-w-xs mb-4">
            <div className="label">
                <span className="label-text text-[#8B8B8B]">{label}</span>
            </div>
            <input
                value={value || ""}
                required
                type={type}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );

    return (
        <div className="flex-1 bg-white flex flex-col rounded-lg m-2 shadow-sm p-8">
            {/* Header */}
            <h1 className="text-3xl text-[#2F2F2F] font-bold mb-4">Profile Details</h1>
            <p className='text-[#8B8B8B] text-sm mb-6'>
                Add your details to create a personal touch to your profile.
            </p>

            {/* Content */}
            <div className="h-full rounded-lg overflow-auto md:max-h-[calc(100vh-500px)] flex flex-col md:flex-row">
                
                {/* Image Upload Section */}
                <div
                    className='bg-[#FAFAFA] w-full my-1 md:mx-1 p-10 rounded-xl flex flex-col items-center justify-center'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                            handleImageChange({ target: { files } });
                        }
                    }}
                >
                    {selectedImage ? (
                        <div className="relative"> 
                            <img
                                src={selectedImage}
                                alt="Thumbnail Preview"
                                className="mx-auto h-[300px] w-[300px] rounded-md"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <>
                            <FaPhotoVideo aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md font-semibold text-[#A5CDC4] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                                >
                                    Upload a file
                                    <input
                                        hidden
                                        required
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={handleImageChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </>
                    )}
                </div>

                {/* Profile Details Form */}
                <div className='bg-[#FAFAFA] w-full my-1 md:mx-1 p-10 rounded-xl flex flex-col items-center'>
                    {renderInputField('First name*', firstName, setFirstName)}
                    {renderInputField('Last name*', lastName, setLastName)}
                    {renderInputField('Email*', userEmail, setUserEmail, 'email')}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-10">
                <button
                    onClick={saveProfile}
                    className="rounded-md p-2 text-[#A5CDC4] font-semibold border border-[#A5CDC4] transition-colors duration-200 hover:bg-[#A5CDC4] hover:text-white"
                >
                    Save Profile
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
