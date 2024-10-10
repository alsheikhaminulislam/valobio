import { FaYoutube, FaFacebook } from "react-icons/fa6";
import { FaLinkedin, FaGithub } from "react-icons/fa"; 
const iconMap = [ 
    {
        name: "Github", icon: <FaGithub className="mr-2 text-xl" />, color:'#191919'
    },
    {
        name: "Youtube", icon: <FaYoutube className="mr-2 text-xl" />, color:'#EF383A'
    },
    {
        name: "Facebook", icon: <FaFacebook className="mr-2 text-xl" />, color:'#0A66C2'
    },
    {
        name: "LinkedIn", icon: <FaLinkedin className="mr-2 text-xl" />, color:'#0866FF'
    }
]; 
export { iconMap }