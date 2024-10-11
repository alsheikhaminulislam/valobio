const renderUserInfo = (data, skeletonClass) => {
    return data ? (
        <div className={`${skeletonClass} mt-2`}>{data}</div>
    ) : (
        <div className={`${skeletonClass} skeleton h-4 w-[160px] mt-2`}></div>
    );
};

export {renderUserInfo}