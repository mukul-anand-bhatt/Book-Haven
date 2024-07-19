import React from "react";

const cart = () => {
    const [Cart , setCart] = useState()
    return <>
    {!Cart && <Loader/>}
        {Cart && Cart.length===0 && (
            <div className="h-screen">
                <div className="h-[100%] flex items-center justify-center flex-col">
                    <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                        Empty Cart
                    </h1>
                    <img/>
                </div>
            </div>
        )}
    </>;
};

export default cart;