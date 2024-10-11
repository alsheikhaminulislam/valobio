import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/ContextProvider';

import { iconMap } from '../assets/Logo';
import { FaEdit, FaShareAltSquare, FaArrowRight } from "react-icons/fa";
import { renderUserInfo } from '../components/renderUserInfo';
const PreviewPage = () => {
  const { uid } = useParams();
  const context = useGlobalContext()
  const usenavigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [linkItem, setLinkItem] = useState([])
  const [ownpage, setOwnPage] = useState(false)

  // Helper function to get icon and color based on name from the icon map
  const getIconAndColor = (name) => {
    const found = iconMap.find(item => item.name === name);
    return found ? { icon: found.icon, color: found.color } : { icon: <></>, color: '#000' }; // Default if not found
  };
  useState(() => {
    context.https.get("user/" + uid)
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
        // setUid(response.data.uid);
      })
      .catch((error) => {
        // toast.error("Error fetching user data");
        // console.error(error);
      });
    context.https.post("validToken")
      .then((response) => {
        setOwnPage(true)
      }).catch((error) => { });
  }, []);

  return (
    <>
      {/* Main container for the card */}
      <div className="relative">

        {/* Header Section with background */}
        <div className="bg-[#A5CDC4] rounded-b-lg h-[300px] p-10">
          {ownpage && (
            <header className="flex items-center justify-between h-[70px] bg-white px-4 shadow rounded-md" >

              {/* Share Link Button */}
              <button
                onClick={() => usenavigate("/home")}
                className="btn border-2 border-[#A5CDC4] text-[#A5CDC4] flex hover:text-white bg-white shadow-sm rounded-md">

                <FaEdit className="text-xl" />
                <span className="hidden md:block">Back to Editor</span>
              </button>
              {/* Preview Button */}
              <button
                onClick={() => {
                  // Copy current page URL to clipboard
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                      console.log('URL copied to clipboard!');
                      // Optionally, show some feedback to the user
                    })
                    .catch(err => {
                      console.error('Failed to copy: ', err);
                    });
                }}
                className="btn border-2 border-[#A5CDC4] text-[#A5CDC4] flex hover:text-white bg-white shadow-sm rounded-md">
                <FaShareAltSquare className="text-xl" />
                <span className="hidden md:block">Share Link</span>
              </button>
            </header>)}
        </div>

        {/* Profile Card Section */}
        <div className="absolute w-full top-[200px] flex justify-center display">
          <div className="relative rounded overflow-hidden shadow-lg bg-white artboard artboard-demo phone-1 ">
            <div className='absolute w-full top-[50px]'>

              {/* Profile Image */}
              <div className="flex justify-center w-full">
                {selectedImage ? (
                  <img className="mask mask-circle h-[100px]" src={selectedImage} alt="Profile" />
                ) : (
                  <div className="skeleton h-[100px] w-[100px] shrink-0 rounded-full mt-10"></div>
                )}
              </div>

              {/* Profile Info */}
              <div className={`px-6 py-4  text-center w-full items-center justify-center ${!lastName?' flex flex-col':''}`}>
                {/* User Name */}
                {renderUserInfo(
                  `${firstName} ${lastName}`,
                  `font-bold text-[#8B8B8B]  ${!lastName?'skeleton h-4 w-2/5 ':''}`
                )}

                {/* User Email */}
                {renderUserInfo(
                  userEmail,
                  `font-bold text-[#8B8B8B]/60 text-sm   ${!userEmail?'w-5/5 skeleton h-2 ':''}`
                )}

                {/* Links */}
                {linkItem && linkItem.length ? (
                  linkItem.sort((a, b) => a.position - b.position).map((data, key) => (
                    <div
                      key={key}
                      className="mt-3 text-white flex justify-between h-[45px] rounded-lg p-3 cursor-pointer"
                      style={{ backgroundColor: data.color }} // Dynamic background color
                      onClick={() => window.location.href = data.link}
                    >
                      <div className="flex items-center">
                        {data.icon} {data.name}
                      </div>
                      <FaArrowRight className="text-xl" />
                    </div>
                  ))
                ) : (
                  <> 
                  <div className="mt-3 bg-gray-200 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3 skeleton"></div>
                  <div className="mt-3 bg-gray-200 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3 skeleton"></div>
                  <div className="mt-3 bg-gray-200 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3 skeleton"></div>
                  <div className="mt-3 bg-gray-200 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3 skeleton"></div>
                  <div className="mt-3 bg-gray-200 text-white flex justify-between w-4/5 h-[45px] rounded-lg p-3 skeleton"></div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default PreviewPage
