// Logica para autenticar el usuario y consultas via api
const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_UNAUTHORIZED = 401;

export const register = (email, password) => {
  return fetch("https://se-register-api.en.tripleten-services.com/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === ERROR_CODE_BAD_REQUEST) {
          console.log("Uno de los campos se rellenó de forma incorrecta");
        }
        throw new Error("Uy algo salio mal");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
};

export const login = (email, password) => {
  return fetch("https://se-register-api.en.tripleten-services.com/v1/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === ERROR_CODE_BAD_REQUEST) {
          console.log("No se ha proporcionado uno o más campos");
        } else if (res.status === ERROR_CODE_UNAUTHORIZED) {
          console.log(
            "No se ha encontrado al usuario con el correo electrónico especificado"
          );
        }
        throw new Error("Uy algo salio mal");
      }
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};

export const validate = () => {
  const token = localStorage.getItem("jwt");
  return fetch(
    "https://se-register-api.en.tripleten-services.com/v1/users/me",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) {
        if (res.status === ERROR_CODE_BAD_REQUEST) {
          console.log(
            "Token no proporcionado o proporcionado en el formato incorrecto"
          );
        } else if (res.status === ERROR_CODE_UNAUTHORIZED) {
          console.log("El token provisto es inválido");
        }
        throw new Error("Uy algo salio mal");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};
