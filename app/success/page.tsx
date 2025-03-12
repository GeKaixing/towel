'use server'
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { getCookie } from "@/util/getcookie";
import Link from "next/link";
async function post(userid: string) {
  try {
    await fetch(`${process.env.ORIGIN}/api/buybuybuy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid }),
      cache: "no-store",
    });
  } catch (e) {
    console.log(e);
  }
}
export default async function Success({ searchParams }: any) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const userData = await getCookie();
    await post(userData); 
    // revalidatePath('/', 'layout')
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
        </p>
        <p>{customerEmail}. If you have any questions, please email </p>
        <p>
          <Link href="mailto:x2890901420@gamil.com">x2890901420@gamil.com</Link>
.
        </p>
      </section>
    );
  }
}
