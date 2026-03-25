import "./InventoryDetails.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TagEl from "../../components/TagsEl/TagEl.jsx";
import TitleComponent from "../../components/TitleComponent/TitleComponent";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function InventoryDetails(props) {
  const params = useParams();
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_URL}/inventories/${params.itemId}`)
      .then((res) => {
        setItemData(res.data[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching inventory item: ${err}`);
        setIsLoading(false);
      });
  }, [params.itemId]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!itemData) {
    return <h1>Item not found</h1>;
  }

  return (
    <>
      <TitleComponent
        title={itemData.item_name}
        backButton={true}
        buttonType='edit'
        buttonTitle='Edit'
        buttonLink='./edit'
      />

      <section className='card-container__background'>
        <div className='card-container__card'>
          <div className='inventory__details__container'>
            <div className='inventory__details__column'>
              <div className='inventory__details__description inventory__details__tab'>
                <h4 className='label'>ITEM DESCRIPTION:</h4>
                <p className='inventory__details__description__text p2'>
                  {itemData.description}
                </p>
              </div>

              <div className='inventory__details__category inventory__details__tab'>
                <h4 className='label'>CATEGORY</h4>
                <p className='inventory__details__category__text p2'>
                  {itemData.category}
                </p>
              </div>
            </div>

            <div className='inventory__details__column'>
              <div className='inventory__details__stats'>
                <div className='inventory__details__status inventory__details__tab'>
                  <h4 className='label'>STATUS:</h4>
                  <TagEl type={itemData.status} />
                </div>

                <div className='inventory__details__quantity inventory__details__tab'>
                  <h4 className='label'>QUANTITY:</h4>
                  <p className='p2'>
                    {itemData.quantity}
                  </p>
                </div>
              </div>

              <div className='inventory__details__quantity inventory__details__tab'>
                <h4 className='label'>WAREHOUSE:</h4>
                <p className='p2'>
                  {itemData.warehouse_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default InventoryDetails;
