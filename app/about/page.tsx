import PageHeroBanner from "@/components/PageHeroBanner";

export default function AboutPage() {
  return (
    <div className="bg-muted/20 min-h-screen">
      <PageHeroBanner pageId="about" />
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Industrial Safety Mart is India&apos;s leading B2B supplier for all industrial needs. We specialize in safety equipment, power tools, and daily consumables required for manufacturing units, construction sites, and corporations.
        </p>
      </div>
    </div>
  );
}
