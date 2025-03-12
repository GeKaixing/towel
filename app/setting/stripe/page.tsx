
export default async function IndexPage({ searchParams }:any) {
    const { canceled } = await searchParams
    if (canceled) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
    return (
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <button type="submit" role="link">
            Checkou
          </button>
        </section>
      </form>
    )
  }