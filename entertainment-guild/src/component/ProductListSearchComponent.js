import downArrow from "../assets/images/DownArrow.png";
import rightArrow from "../assets/images/RightArrow.png";
import ProductList from "./ProductList";
import React, {useState} from "react";

const ProductListSearchComponent = ({ apiUrl, genre, searchTerm, descriptionLength = 400}) => {
    const [isHidden, setIsHidden] = useState(false);
    const setHidden = () => {
        if (isHidden === false) {
            setIsHidden(true);
        }
        else {
            setIsHidden(false);
        }
    }
    return (
        <div>
            <div className="productListSearchContainer">
                {genre === 1 &&
                    <h2>Books &nbsp;</h2>
                }
                {genre === 2 &&
                    <h2>Movies &nbsp;</h2>
                }
                {genre === 3 &&
                    <h2>Games &nbsp;</h2>
                }
                {isHidden === false &&
                    <img src={downArrow}
                         onClick={setHidden}
                         width={30}
                         height={30}
                         alt="down arrow image"/>
                }
                {isHidden === true &&
                    <img src={rightArrow}
                         onClick={setHidden}
                         width={30}
                         height={30}
                         alt="right arrow image"/>
                }
            </div>
            {isHidden === false &&
            <ProductList
                apiUrl={apiUrl}
                genre={genre}
                searchTerm={searchTerm}
                descriptionLength={descriptionLength}
                orientation={"vertical"}
            />}
        </div>
    );
}

export default ProductListSearchComponent;
    