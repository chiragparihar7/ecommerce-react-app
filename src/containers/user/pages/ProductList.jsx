import React from "react";
import ProductCard from "../../../components/ProductCard";

const ProductList = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-4 bg-gray-50">
      <ProductCard
        image="/src/assets/watch.png"
        title="Octo Roma Watch"
        price="1063.55"
        oldPrice="899.99"
        description="The Octo Roma Chronograph is a stylish and modern timepiece featuring a unique octagonal stainless steel case, a striking blue Clous de Paris dial, and chronograph functions."
        likedByUser={false}
      />

      <ProductCard
        image="/src/assets/DiorxAirJordan1High.png"
        title="Dior x Air Jordan 1 High"
        price="8821.56"
        oldPrice="7085.56"
        description="The Dior x Air Jordan 1 High, which bridges the gap between street-ready sportswear and luxury fashion, is part of a bigger collaboration that includes apparel, accessories, and footwear. "
        likedByUser={true}
      />
      <ProductCard
        image="/src/assets/Bag.png"
        title="Bag"
        price="2590.99"
        oldPrice="1969.99"
        description="Beige textured shoulder bag 3 main compartmentsHas a zip closure, 2 inner pocketsTablet sleeve: noTwo handles Warranty: 6 monthsWarranty provided by brand owner/manufacturer"
        likedByUser={true}
      />
      <ProductCard
        image="/src/assets/BoatAirpodes.png"
        title="Boat AirPods"
        price="19.99"
        oldPrice="69.99"
        description="Wireless Earbuds with 8mm Drivers, IWP & ENxTM Technology, ASAP Fast Charge, Upto 42 hours Playback, IPX4 Sweat & Water Resistance."
        likedByUser={true}
      />
    </div>
  );
};

export default ProductList;
