"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Algo deu errado!</h2>
      <button onClick={() => reset()}>Tente novamente</button>
    </div>
  );
}
