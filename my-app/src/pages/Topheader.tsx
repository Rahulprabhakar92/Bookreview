import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";

export default function Topheader() {
    const navigate = useNavigate();

    return (
        <header 
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 20px",
                background: "#333",
                color: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                cursor: "pointer",
            }}
            onClick={() => navigate("/Home")}
        >

            <FaBook size={30} style={{ marginRight: "10px", color: "white" }} />


            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Book Review App</h1>
        </header>
    );
}
