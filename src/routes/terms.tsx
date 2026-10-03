import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — BrandLux" },
      {
        name: "description",
        content: "The terms that govern your use of the BrandLux website and wishlist.",
      },
      { property: "og:title", content: "Terms of Service — BrandLux" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      updated="Last updated: August 29, 2026"
      intro="These terms govern your use of the BrandLux website and the early-access wishlist. By using the site you agree to them. The BrandLux product itself is not publicly launched yet; separate terms will apply to paid plans when it does."
    >
      <LegalSection title="1. The service today">
        <p>
          This website is a pre-launch site. It lets you join a wishlist to be notified when
          BrandLux becomes available and to receive launch perks. Joining the wishlist is
          free and does not create any obligation to purchase anything.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility and accounts">
        <p>
          You must provide accurate information when joining the wishlist or contacting us,
          and you must be at least 16 years old. We may remove duplicate or abusive signups.
        </p>
      </LegalSection>

      <LegalSection title="3. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Submit false, misleading or other people's information without their consent;</li>
          <li>Abuse, spam or automate signups (bulk or scripted submissions);</li>
          <li>Attempt to breach, probe or disrupt the website or its infrastructure;</li>
          <li>Copy, scrape or republish the site's design, text or assets without permission.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Intellectual property">
        <p>
          The BrandLux name, logo, design, text and other content on this site are owned by
          us (or licensed to us) and protected by applicable intellectual property laws.
          Nothing here grants you any license to use our trademarks or content beyond
          personal, non-commercial viewing.
        </p>
      </LegalSection>

      <LegalSection title="5. Future product and pricing">
        <p>
          Features, pricing tiers and launch timing shown on this site are indicative and
          may change before launch. Wishlist membership does not guarantee access, specific
          features or pricing. Paid subscriptions, once available, will be governed by the
          terms presented at checkout.
        </p>
      </LegalSection>

      <LegalSection title="6. Disclaimer">
        <p>
          The site is provided "as is" and "as available" without warranties of any kind,
          express or implied, including fitness for a particular purpose. We do not warrant
          that the site will be uninterrupted or error-free.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitation of liability">
        <p>
          To the maximum extent permitted by law, BrandLux and its operators will not be
          liable for any indirect, incidental or consequential damages arising from your use
          of this site. Our total liability for any claim is limited to the amount you paid
          us in the 12 months before the claim — which, for this free pre-launch site, is
          zero.
        </p>
      </LegalSection>

      <LegalSection title="8. Third-party services">
        <p>
          The site relies on third-party services (such as Supabase for data storage and
          Cloudflare for hosting). Their use of technical data is governed by their own
          policies; see our Privacy Policy for details.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes and termination">
        <p>
          We may update these terms from time to time; the date above reflects the latest
          revision. Continued use of the site after changes means you accept them. We may
          suspend access for anyone violating these terms.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact">
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:hello@brandlux.com" className="font-medium text-primary hover:underline">
            hello@brandlux.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
