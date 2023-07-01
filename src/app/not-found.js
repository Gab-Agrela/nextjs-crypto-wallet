import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Não encontrado</h2>
      <p>
        Olhe <Link href="/">todas as moedas</Link>
      </p>
    </div>
  );
}
