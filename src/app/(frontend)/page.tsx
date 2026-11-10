import { createJulegave, readJulegaver } from "./actions";

export default async function HomePage() {
  const julegaver = await readJulegaver();

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
      <hr />
      <section className="julegaver">
        {
          julegaver.length === 0 ? (
            <p>Nissen har nok ikke vært her ennå</p>
          ) : (
            <>
              {
                julegaver.map(gave => (
                  <p key={gave.id}>{gave.mottaker} skal få {gave.betegnelse}</p>
                ))
              }
            </>
          )
        }
      </section>
    </main>
  )
}
