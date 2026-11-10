import createJulegave from "./actions";

export default async function HomePage() {
  return (
    <main>
      <h1>Julegave-lista 2026</h1>
      <form className="opprett-julegave-form" action={createJulegave}>
        <label>
          <span>Julegave</span>
          <input type="text" name="betegnelse" required />
        </label>
        <label>
          <span>Mottaker</span>
          <input type="text" name="mottaker" required />
        </label>
        <button type="submit">Legg til julegave</button>
      </form>
    </main>
  )
}
