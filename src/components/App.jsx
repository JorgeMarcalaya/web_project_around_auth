import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { apiCards, apiUser, apiAvatar } from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    apiCards.getInitialCards([], (data) => {
      const processedCards = data.map((card) => ({
        ...card,
        idcard: card._id || card.idcard, // Usa el ID de la API
        isLiked: card.likes.some((like) => like._id === currentUser._id),
      }));
      setCards(processedCards);
    });
  }, [currentUser]);
  async function handleCardLike(card) {
    try {
      const isLiked = card.isLiked; // Estado actual del like
      const updateCard = await apiCards.changeLikeCardStatus(
        card.idcard,
        !isLiked
      ); // Llama a la API

      setCards((state) =>
        state.map((currentCard) =>
          currentCard.idcard === card.idcard
            ? {
                ...currentCard,
                isLiked: !currentCard.isLiked,
                likes: updateCard.likes,
              }
            : currentCard
        )
      );

      console.log("Tarjeta actualizada:", updateCard); // Verifica que la respuesta de la API sea válida
    } catch (error) {
      console.error("Error al actualizar el like:", error);
    }
  }

  async function handleCardDelete(card) {
    try {
      const quickCard = await apiCards.deleteCard(card.idcard);

      setCards((state) =>
        state.filter((existingCard) => existingCard.idcard !== card.idcard)
      );

      console.log("Tarjeta eliminada:", quickCard); // Verifica que la respuesta de la API sea válida
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  }
  useEffect(() => {
    (async () => {
      const userData = await apiUser.getUserInfo();
      setCurrentUser(userData);
    })();
  }, []);

  const handleUpdateUser = async (userDataCurrent) => {
    try {
      const updateUser = await apiUser.editUserInfo(userDataCurrent);
      setCurrentUser(updateUser);
      handleClosePopup();
      console.log("Usuario actualizado:", updateUser);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleUpdateAvatar = async (userDataCurrent) => {
    try {
      const updateUserAvatar = await apiAvatar.editPhotoProfile(
        userDataCurrent
      );
      setCurrentUser(updateUserAvatar);
      handleClosePopup();
      console.log("Avatar del usuario actualizado:", updateUserAvatar);
    } catch (error) {
      console.error("Error al actualizar el avatar del usuario:", error);
    }
  };

  async function handleAddPlaceSubmit(cardAdd) {
    try {
      // Envía la nueva tarjeta al backend y obtén la respuesta
      const newCard = await apiCards.cardAditional(cardAdd);
      const normalizedCard = {
        ...newCard,
        idcard: newCard._id, // Usa _id como idcard para compatibilidad
        iduser: currentUser._id,
      };
      // Actualiza el estado de las tarjetas agregando la nueva tarjeta al inicio
      setCards((prevCards) => [normalizedCard, ...prevCards]);
      handleClosePopup();
      console.log("Tarjeta agregada:", normalizedCard); // Verifica el resultado
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error);
    }
  }

  function handleOpenPopup(popupInfo) {
    setPopup(popupInfo);
  }
  function handleClosePopup() {
    setPopup(null);
  }
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="body page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          onAddCard={handleAddPlaceSubmit}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
