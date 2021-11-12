import React , {useState} from 'react'
import Popup from 'reactjs-popup';


const ControlledPopup = ({repo}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const languages = []

  for(let i = 0 ; i < repo.languages.nodes.length ; i++ ){
      languages.push(
          <p>{repo.languages.nodes[i].name}</p>
      )
  }
  return (
    <div>
      <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Voir plus
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="p-5 w-96 h-96 bg-gray-400 border-black border-2 shadow-2xl rounded-md">
            <h1>{repo.name}</h1>
            <p>description : {repo.description}</p>
            <div>
                <p>Language utiliser : </p>
                {languages}
            </div>
        </div>
        <button onClick={() => closeModal()}>Fermer</button>
      </Popup>
    </div>
  );
};




export default ControlledPopup;