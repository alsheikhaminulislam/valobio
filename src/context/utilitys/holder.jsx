class holder {
    host() {   
        return  process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://valoxity.com/"
    }
}
export default holder;