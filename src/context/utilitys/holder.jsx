class holder {
    host() {   
        return  process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://valobioserver.onrender.com"
    }
}
export default holder;