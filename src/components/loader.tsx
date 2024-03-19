import { zoomies } from "ldrs";

export default function Loader() {
    zoomies.register();
    return (
        <l-zoomies
            size="300"
            stroke="5"
            bg-opacity="0.1"
            speed="1.4"
            color="#f8f8f8"
        ></l-zoomies>
    );
}
