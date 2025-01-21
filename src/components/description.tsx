import React, { useState } from "react";
import "./DetailItem.css"; // Fichier CSS pour le style

interface Description {
  placeHolder?:string;
  quantity?:number;
  unitPrice?:number;
  setQuantity:any;
  setUnitPrice:any;
  setDescription:any

}
const DetailItem = ({ placeHolder,quantity,unitPrice,setQuantity,setUnitPrice,setDescription }:Description) => {
  // const [quantity, setQuantity] = useState(1); // Quantité initiale
  // const [unitPrice, setUnitPrice] = useState(0); // Prix unitaire initial

  // Gestion de l'augmentation/diminution de la quantité
  // const handleIncrement = () => setQuantity((prev:any)=>prev+1);
  // const handleDecrement = () => setQuantity((prev:any)=>prev-1);

  return (
    <div className="detail-item">
      <div className="detail-header">
        <input
          type="text"
          placeholder={placeHolder}
          className="detail-input"
          onChange={(e)=>setDescription(e.target.value)}
        />
        <button className="delete-button">🗑</button>
      </div>
      <div className="detail-body">
        <div className="detail-group">
          <label>Prix unitaire</label>
          <div className="input-group">
            <button onClick={() => {
              if(unitPrice>0) setUnitPrice((prev:any)=>prev-1)
              
              }}>-</button>
            <input
              type="text"
              value={`${unitPrice} €`}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
            />
            <button onClick={() => setUnitPrice((prev:any)=>prev+1)}>+</button>
          </div>
        </div>
        <div className="detail-group">
          <label>Quantité</label>
          <div className="input-group">
            <button onClick={()=>{
              if(quantity>1)setQuantity((prev:any)=>prev-1)}}>-</button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => {
                setQuantity(parseInt(e.target.value) || 1)
              }}
            />
            <button onClick={() => setQuantity((prev:any)=>prev+1)}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailItem;
