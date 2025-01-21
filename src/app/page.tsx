"use client"
import { useEffect, useState } from "react";
import "./page.css";
import DetailItem from "@/components/description";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleArrowLeft, faThumbsUp, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "@/components/modal/modalSuccess";

interface Devis {
  num_devis: number;
  name: string
  prestation: string
  date_debut: Date;
  duree: number;
  lieux: string;
  paiment: string;
  condition: string
}
export default function Home() {
  const date = new Date()
  const numero_devis = date.getTime()
  const user = localStorage.getItem("userTestAfri") ?? ""
  //initisaliser les différents états
  const [currentUser, setCurrentUser] = useState<string>(user)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prixInfo1, setPrixInfo1] = useState<number>(0)
  const [prixInfo2, setPrixInfo2] = useState<number>(0)
  const [quantity1, setQuantity1] = useState<number>(1)
  const [quantity2, setQuantity2] = useState<number>(1)
  const [description1, setDescription1] = useState<string>()
  const [description2, setDescription2] = useState<string>()
  const [prixTotal, setPrixTotal] = useState<number>(0)
  const [devis, setDevis] = useState<Devis>({
    num_devis: numero_devis,
    name: currentUser,
    prestation: "",
    date_debut: date,
    duree: 0,
    lieux: "",
    paiment: "",
    condition: ""
  })
  // const [description, setDescription] = useState<any[]>([
  //   {
  //     id: Math.random(),
  //     price: 0,
  //     quantity: 0,
  //     placeholder: "information detaillée n°1"
  //   }
  // ])

  //modifier les différents input
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setDevis({ ...devis, [name]: value })
    if (prixInfo1 > 0) {
      const price = prixInfo1 * quantity1 + prixInfo2 * quantity2
      setPrixTotal(price)
    }

  }

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  // validation des entrées
  const validation =():boolean=>{
    if(!devis.prestation || !devis.condition || !devis.date_debut || devis.duree === 0 || !devis.paiment || !devis.lieux){
      return false
    }
    if(!description1 || quantity1 === 0 || prixInfo1 === 0){
      return false
    }
    return true
  }

  //enregistrer le devis et réinitialiser les inputs
  const handleClick = async (e: any) => {
    e.preventDefault()
    const descriptions = [
      {
        prix: prixInfo1,
        quantity: quantity1,
        description: description1
      },
      {
        prix: prixInfo2,
        quantity: quantity2,
        description: description2
      },
    ]
    console.log(descriptions)
    console.log(devis)
    if(!validation()){
      alert("veuillez remplir tous les champs avec une etoile rouge")
      return 
    }
    try {
      const { data } = await axios.post("http://localhost:5000/devis/created", { ...devis, descriptions: descriptions, prix: prixTotal })
      console.log(data)
      setIsModalOpen(true)
      const newNum = new Date().getTime()
      setDevis({
        num_devis: newNum,
        name: currentUser,
        prestation: "",
        date_debut: date,
        duree: 0,
        lieux: "",
        paiment: "",
        condition: ""
      })
    } catch (error) {
      console.log(error)
    }
  }

  //effacer les information entrées
  const annuler = (e: any) => {
    e.preventDefault()
    const newNum = new Date().getTime()
    setDevis({
      num_devis: newNum,
      name: "",
      prestation: "",
      date_debut: date,
      duree: 0,
      lieux: "",
      paiment: "",
      condition: ""
    })
  }
  //Créer un nouvel user
  const createUser = async (e: any) => {
    localStorage.setItem("userTestAfri",currentUser)
  }

  return (
    <div className="container">
      <div className="item">
        {/* header descktop */}
        <div className="header"> </div>
        {/* header mobile */}
        <div className="headerMobile">
          <div style={{ display: "flex", alignItems: "center", }}>
            <FontAwesomeIcon color="#2a6fc4" size="2x" icon={faCircleArrowLeft} />
            <h2 style={{ marginLeft: "15px", color: "#2a6fc4" }}>retour</h2>
          </div>
          <div>
            <FontAwesomeIcon style={{ marginRight: "15px" }} color="#2a6fc4" size="2x" icon={faBars} />
            <FontAwesomeIcon color="#2a6fc4" size="2x" icon={faUserCircle} />
          </div>
        </div>
        <div className="form-container">
          {
            user === "" ?
              <form>
                <div className="form-group">
                  <label htmlFor="nom-client">Entrer votre nom pour continuer :</label>
                  <input value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} name="name" type="text" id="nom-client" placeholder="Entrez le nom du client" />
                </div>
                <div className="form-actions">
                  <button type="submit" onClick={(e) => annuler(e)} style={{ backgroundColor: "rgb(223, 222, 222)" }}>Annuler</button>
                  <button onClick={(e) => createUser(e)} type="submit">Enregistrer</button>
                </div>
              </form> :
              <>
                <h2>Informations détaillées sur la prestation</h2>
                {/* formulaier du devis */}
                <div className="form" >
                  <div className="form-group">
                    <label htmlFor="num-devis">Numéro de devis :</label>
                    <input value={devis.num_devis} disabled type="text" onChange={(e) => handleChange(e)} name="num_devis" id="num-devis" placeholder="Entrez le numéro de devis" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nom-client">Nom du client :</label>
                    <input value={devis.name} disabled onChange={(e) => handleChange(e)} name="name" type="text" id="nom-client" placeholder="Entrez le nom du client" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prestation-demandee">Prestation demandée : <span>*</span></label>
                    <input value={devis.prestation} onChange={(e) => handleChange(e)} name="prestation" type="text" id="prestation-demandee" placeholder="Entrez la prestation demandée" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date-debut">Date et heure de début : <span>*</span> </label>
                    <input value={String(devis.date_debut)} onChange={(e) => handleChange(e)} name="date_debut" type="datetime-local" id="date-debut" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duree">Durée de la prestation : <span>*</span></label>
                    <input value={devis.duree} onChange={(e) => handleChange(e)} name="duree" type="number" id="duree" placeholder="Entrez la durée" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lieu">Lieu de la prestation :<span>*</span></label>
                    <input value={devis.lieux} onChange={(e) => handleChange(e)} name="lieux" type="text" id="lieu" placeholder="Entrez le lieu" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description :<span>*</span></label>
                    <DetailItem setDescription={setDescription1} placeHolder="information detaillée n°1" unitPrice={prixInfo1} setUnitPrice={setPrixInfo1} quantity={quantity1} setQuantity={setQuantity1} />
                    <DetailItem setDescription={setDescription2} placeHolder="information detaillée n°2 (si existante)" unitPrice={prixInfo2} setUnitPrice={setPrixInfo2} quantity={quantity2} setQuantity={setQuantity2} />
                  </div>
                  <div className="description-container">
                    <input
                      type="text"
                      className="description-input"
                      placeholder="Ajouter une description"
                    />
                    <div className="description-icon">+</div>
                  </div>
                  <div className="prix-total">
                    <label htmlFor="prix-unitaire">Prix Total</label>
                    <div className="prixTotal">
                      {prixTotal} €
                    </div>
                    <div>
                      TTC
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mode-paiement">Quel est le mode de paiement ? :<span>*</span></label>
                    <select value={devis.paiment} onChange={(e) => handleChange(e)} name="paiment" id="mode-paiement">
                      <option value="carte">Carte bancaire</option>
                      <option value="virement">Virement bancaire</option>
                      <option value="cheque">Chèque</option>
                      <option value="especes">Espèces</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="conditions">Quelles sont vos conditions de travail ? :<span>*</span></label>
                    <textarea value={devis.condition} onChange={(e) => handleChange(e)} name="condition" id="conditions" placeholder="Décrivez vos conditions"></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" onClick={(e) => annuler(e)} style={{ backgroundColor: "rgb(223, 222, 222)" }}>Annuler</button>
                    <button onClick={(e) => handleClick(e)} type="submit">Enregistrer</button>
                  </div>
                </div>
              </>
          }

        </div>
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="modalTitle">Devis N°{devis.num_devis} créer avec success</h2>
        <p className="iconModal"><FontAwesomeIcon icon={faThumbsUp} color="green" size="7x" /></p>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Fermer
        </button>
      </Modal>
    </div>

  );
}
