import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — BrandLux" },
      {
        name: "description",
        content: "How BrandLux collects, uses and protects your data.",
      },
      { property: "og:title", content: "Privacy Policy — BrandLux" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated: August 29, 2026"
      intro="This policy explains what information BrandLux collects through this website, why we collect it, and the choices you have. Short version: we only collect what we need to run the wishlist and answer your messages, and we never sell your data."
    >
      <LegalSection title="1. What we collect">
        <p>
          <strong className="text-foreground">Wishlist signups.</strong> When you join the
          wishlist we store your email address, the place on the site where you signed up,
          and the date of signup.
        </p>
        <p>
          <strong className="text-foreground">Contact messages.</strong> When you use the
          contact form we store your name, email address and the message you send us.
        </p>
        <p>
          <strong className="text-foreground">Technical data.</strong> Like most websites,
          our hosting providers log basic request data (such as IP address, browser type and
          pages visited) for security and reliability purposes.
        </p>
      </LegalSection>

      <LegalSection title="2. How we use it">
        <p>We use this information to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Notify you about early access, launch updates and launch-day perks you asked for;</li>
          <li>Respond to questions, partnership or press inquiries;</li>
          <li>Keep the website secure and understand aggregate interest (e.g. how many people joined).</li>
        </ul>
        <p>
          We do not use your data for advertising profiles, and we never sell or rent your
          personal information to anyone.
        </p>
      </LegalSection>

      <LegalSection title="3. Where data is stored">
        <p>
          Wishlist and contact data is stored in a Supabase (PostgreSQL) database protected
          by row-level security, so signups can be written but are not publicly readable.
          The website itself is hosted on Cloudflare infrastructure. Both providers act as
          data processors under contractual obligations.
        </p>
      </LegalSection>

      <LegalSection title="4. Cookies">
        <p>
          This site does not set advertising or tracking cookies. If we add analytics in the
          future, we will update this policy and prefer privacy-friendly, aggregate-only
          tools.
        </p>
      </LegalSection>

      <LegalSection title="5. Your rights">
        <p>
          Depending on where you live (for example under the GDPR or CCPA), you may have the
          right to access, correct, export or delete your personal data, and to withdraw
          consent at any time. To exercise any of these rights, email{" "}
          <a href="mailto:hello@brandlux.com" className="font-medium text-primary hover:underline">
            hello@brandlux.com
          </a>{" "}
          and we will respond within 30 days. Every marketing email we send will also
          include an unsubscribe link.
        </p>
      </LegalSection>

      <LegalSection title="6. Data retention">
        <p>
          We keep wishlist emails until the launch program ends or until you ask us to delete
          them, whichever comes first. Contact messages are kept as long as needed to resolve
          your inquiry, then archived or deleted.
        </p>
      </LegalSection>

      <LegalSection title="7. Children">
        <p>
          BrandLux is not directed at children under 16, and we do not knowingly collect
          their data. If you believe a child has submitted personal information, contact us
          and we will remove it.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes">
        <p>
          If we make material changes to this policy we will update the date above and,
          where appropriate, notify wishlist members by email before the changes take effect.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          Questions about this policy or your data? Email{" "}
          <a href="mailto:hello@brandlux.com" className="font-medium text-primary hover:underline">
            hello@brandlux.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
