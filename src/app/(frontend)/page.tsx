import { createJulegave, deleteJulegave, readJulegaver, updateJulegave } from "./actions";

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
            <section className="julegave-grid">
              {
                julegaver.map(gave => (
                  <article key={gave.id}>
                    <form action={updateJulegave.bind(null, gave.id)}>
                      <label>
                        <span>Julegave</span>
                        <input type="text" name="betegnelse" required defaultValue={gave.betegnelse} />
                      </label>
                      <label>
                        <span>Mottaker</span>
                        <input type="text" name="mottaker" required defaultValue={gave.mottaker} />
                      </label>
                      <button type="submit">Oppdater gave</button>
                    </form>
                    <form action={deleteJulegave.bind(null, gave.id)}>
                      <button type="submit" title="Slett julegave">X</button>
                    </form>
                  </article>
                ))
              }
            </section>
          )
        }
      </section>
    </main>
  )
}
