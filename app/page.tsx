import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About, Skills } from "@/components/about";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ClientEnhancements } from "@/components/motion";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  const person = {
    "@context": "https://schema.org", "@type": "Person", name: portfolio.name,
    url: portfolio.siteUrl, image: `${portfolio.siteUrl}${portfolio.portrait}`,
    jobTitle: portfolio.role, description: portfolio.description,
    email: portfolio.email, sameAs: portfolio.socials.map(social => social.href),
    address: { "@type": "PostalAddress", addressLocality: portfolio.address.city, addressCountry: portfolio.address.country },
    alumniOf: { "@type": "CollegeOrUniversity", name: portfolio.university },
    knowsAbout: portfolio.skills.items
  };
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <ClientEnhancements /><Navbar />
    <main id="main-content"><Hero /><Projects /><About /><Skills /><Experience /><Contact /></main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
  </>;
}
