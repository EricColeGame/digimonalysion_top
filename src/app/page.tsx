import Link from "next/link";

export default function RootPage() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0;url=/en" />
      <p>
        Redirecting to <Link href="/en">Digimon Alysion Wiki</Link>…
      </p>
    </main>
  );
}
