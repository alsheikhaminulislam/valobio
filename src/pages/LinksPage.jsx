import ItemListLayout from '../components/ItemListLayout';
import { useGlobalContext } from '../context/ContextProvider';
import { FaLink } from "react-icons/fa";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { toast } from 'react-toastify';

const LinksPage = ({ linkItem, setLinkItem, addNewLink }) => {
    const context = useGlobalContext();

    // Save links (without the icon field)
    const SaveLinks = () => {
        const filteredLinks = linkItem.map(({ icon, ...rest }) => rest); // Filter out icon before saving
        context.https.post("savelinks", { links: filteredLinks })
            .then((r) => { 
                toast.success(  r.data.message) 
            })
            .catch((error) => {
                toast.error("Error saving links");
            });
    };

    // Update a specific link item
    const updateLinkItem = (index, updatedFields) => {
        setLinkItem((prevItems) =>
            prevItems.map((item, idx) => idx === index ? { ...item, ...updatedFields } : item)
        );
    };

    // Remove a specific link item
    const removeLinkItem = (index) => {
        setLinkItem((prevItems) => prevItems.filter((_, idx) => idx !== index));
    };

    // Swap the positions of link items
    const swapPositions = (index, direction) => {
        setLinkItem((prevItems) => {
            const newItems = [...prevItems];
            const swapWith = direction === 'up' ? index - 1 : index + 1;
            if (swapWith < 0 || swapWith >= newItems.length) return prevItems;

            // Swap items and update positions
            [newItems[index], newItems[swapWith]] = [newItems[swapWith], newItems[index]];
            return newItems.map((item, idx) => ({ ...item, position: idx + 1 })); // Recalculate positions
        });
    };

    return (
        <div className="flex-1 bg-white flex flex-col rounded-lg m-2 shadow-sm p-8">
            <h1 className="text-3xl text-[#2F2F2F] font-bold mb-4">Customize Your Links</h1>
            <p className="text-[#8B8B8B] text-sm mb-6">
                Add, edit or remove a link below, and then share all your profiles with the world!
            </p>

            {/* Add New Link button, shown only if there are fewer than 5 links */}
            {linkItem.length < 5 && (
                <button
                    onClick={addNewLink}
                    className="rounded-md p-2 w-full text-[#A5CDC4] font-semibold border border-[#A5CDC4] transition-colors duration-200 mb-6"
                >
                    + Add New Link
                </button>
            )}

            <div className="h-full rounded-lg overflow-auto md:max-h-[calc(100vh-500px)] mb-5">
                {/* Render each link item sorted by position */}
                {linkItem
                    .sort((a, b) => a.position - b.position)
                    .map((data, index) => (
                        <div key={index} className="bg-[#F8F8F8] p-6 rounded-lg shadow-sm mt-5">
                            <div className="flex justify-between items-center mb-4">
                                {/* Display link position and swap buttons */}
                                <div className="flex items-center font-semibold text-[#4A4A4A] text-lg ">
                                    {index > 0 && (
                                        <BiUpArrowAlt
                                            className="text-lg cursor-pointer"
                                            onClick={() => swapPositions(index, 'up')}
                                        />
                                    )}
                                    {index < linkItem.length - 1 && (
                                        <BiDownArrowAlt
                                            className="text-lg mr-2 cursor-pointer"
                                            onClick={() => swapPositions(index, 'down')}
                                        />
                                    )}
                                    Link #{index + 1}
                                </div>
                                {/* Remove link button */}
                                <button
                                    className="text-[#EF383A] font-medium hover:underline"
                                    onClick={() => removeLinkItem(index)}
                                >
                                    Remove
                                </button>
                            </div>

                            {/* Link item editor */}
                            <ItemListLayout data={data} i={index} LinkItem={setLinkItem} />
                            <label className="input input-bordered flex items-center gap-2 p-2 border border-[#D4D4D4] rounded-md">
                                <FaLink className="text-[#8B8B8B]" />
                                <input
                                    type="text"
                                   className="grow outline-none text-sm placeholder-[#B1B1B1] border-none focus:outline-none focus:ring-0 focus:border-none"
                                    placeholder="https://yourlink.com"
                                    value={data.link}
                                    onChange={(e) => updateLinkItem(index, { link: e.target.value })}
                                />
                            </label>
                        </div>
                    ))}
            </div>

            {/* Save Links button */}
            <div className="flex justify-end mt-10">
                <button
                    onClick={SaveLinks}
                    className="rounded-md p-2 text-[#A5CDC4] font-semibold border border-[#A5CDC4] transition-colors duration-200 hover:bg-[#A5CDC4] hover:text-white"
                >
                    Save Links
                </button>
            </div>
        </div>
    );
};

export default LinksPage;
