import React, { useEffect, useState } from 'react';
import { FaGithub } from "react-icons/fa";
import Header from '../components/Header';
import MobileView from '../components/MobileView';
import LinksPage from './LinksPage';
import ProfilePage from './ProfilePage';
import { useGlobalContext } from '../context/ContextProvider';
import { iconMap } from '../assets/Logo';
import { toast } from 'react-toastify';

export default function Home() {
    const context = useGlobalContext();

    // States for managing profile and links
    const [page, setPage] = useState('links'); // Either 'links' or 'profile'
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState(null);
    const [linkItem, setLinkItem] = useState([]);
    const [uid, setUid] = useState('');

    // Handle image selection (uploading or drag-and-drop)
    const handleImageChange = (e) => {
        const input = e.target.files ? e.target : e.dataTransfer;
        if (!input.files || !input.files[0]) return;

        const file = input.files[0];
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result); // Convert to base64
            reader.readAsDataURL(file);
            URL.revokeObjectURL(url); // Cleanup URL
        };

        img.src = url;
    };

    // Helper function to get icon and color based on name from the icon map
    const getIconAndColor = (name) => {
        const found = iconMap.find(item => item.name === name);
        return found ? { icon: found.icon, color: found.color } : { icon: <></>, color: '#000' }; // Default if not found
    };

    // Fetch user profile and links on component mount
    useEffect(() => {
        context.https.post("userbytoken", {})
            .then((response) => {
                const profile = response.data.profile;
                setFirstName(profile.firstName);
                setLastName(profile.lastName);
                setUserEmail(profile.userEmail);
                setSelectedImage(profile.image);

                // Map over the links and attach the correct icon and color from the icon map
                const links = response.data.links.map(link => {
                    const { icon, color } = getIconAndColor(link.name);
                    return { ...link, icon, color };
                });

                setLinkItem(links);
                setUid(response.data.uid);
            })
            .catch((error) => {   });
    }, []);

    // Function to add a new link item (Github by default)
    const addNewLink = () => {
        setLinkItem(prev => [
            ...prev,
            {
                position: prev.length + 1,
                icon: <FaGithub className="mr-2 text-xl" />,
                name: 'Github',
                link: '',
                color: '#191919',
            }
        ]);
    };

    // Function to save the updated profile to the server
    const saveProfile = () => {
        context.https.post("saveprofile", {
            firstName,
            lastName,
            userEmail,
            image: selectedImage || ""
        })
        .then((response) => toast.success(response.data.message))
        .catch((error) => toast.error(error));
    };

    // Function to remove the selected image
    const removeImage = () => setSelectedImage(null);

    return (
        <div className="overflow-auto bg-[#FAFAFA] md:pt-5 sm:px-5 md:px-10 lg:px-20 h-screen">
            <Header page={page} setPage={setPage} uid={uid} />
            <main className="relative md:pt-6 min-h-[calc(100vh-176px)] lg:flex sm:block">
                {/* Left Side: Mobile View */}
                <MobileView 
                    selectedImage={selectedImage}
                    firstName={firstName}
                    lastName={lastName}
                    userEmail={userEmail}
                    linkItem={linkItem}
                    setLinkItem={setLinkItem} 
                />

                {/* Right Side: Links or Profile Page */}
                {page === 'links' ? (
                    <LinksPage 
                        linkItem={linkItem} 
                        setLinkItem={setLinkItem} 
                        addNewLink={addNewLink} 
                    />
                ) : (
                    <ProfilePage 
                        selectedImage={selectedImage}
                        removeImage={removeImage}
                        setFirstName={setFirstName}
                        setLastName={setLastName}
                        setUserEmail={setUserEmail}
                        firstName={firstName}
                        lastName={lastName}
                        userEmail={userEmail}
                        handleImageChange={handleImageChange}
                        saveProfile={saveProfile}
                    />
                )}
            </main>
        </div>
    );
}
